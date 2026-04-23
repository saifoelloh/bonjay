import { registry } from '../registry.js'

import solidSingleResponsibilityRule from './code-quality/solid-single-responsibility.md'
import solidOpenClosedRule from './code-quality/solid-open-closed.md'
import dryPrincipleRule from './code-quality/dry-principle.md'
import kissYagniRule from './code-quality/kiss-yagni.md'
import solidDependencyInversionRule from './code-quality/solid-dependency-inversion.md'
import raceConditionRule from './concurrency-fundamentals/race-condition.md'
import deadlockPreventionRule from './concurrency-fundamentals/deadlock-prevention.md'
import goroutineLeakRule from './concurrency-fundamentals/goroutine-leak.md'
import channelsVsMutexRule from './concurrency-fundamentals/channels-vs-mutex.md'
import contextCancellationRule from './concurrency-fundamentals/context-cancellation.md'

registry.registerGroup({
  id: 'engineering-practices',
  name: 'Engineering Practices',
  icon: '⚙️',
  description: 'Code Quality, Testing, Concurrency — how to build reliable software',
  skills: [
    { id: 'code-quality', description: 'SOLID, DRY, KISS, YAGNI, and code smell detection' },
    { id: 'testing-strategy', description: 'Unit, Integration, E2E, TDD, BDD, and test coverage' },
    { id: 'concurrency-fundamentals', description: 'Threads, race conditions, deadlocks, async patterns' },
  ],
})

// ──────────────────────────────────────────────
// Skill: code-quality
// ──────────────────────────────────────────────
registry.registerSkill({
  id: 'code-quality',
  name: 'Code Quality',
  groupId: 'engineering-practices',
  description: 'SOLID principles, DRY, KISS, YAGNI, and identifying code smells.',
  howToUse: `
- "Review this code for quality issues"
- "Does this violate SOLID principles?"
- "Identify code smells in this file"
`,
  routingLogic: `
- SOLID violations → code-quality
- Code smells (duplication, long methods, etc.) → code-quality
- "Is this clean code?" → code-quality
`,
  rules: [
    {
      id: 'solid-single-responsibility',
      priority: 'HIGH',
      content: solidSingleResponsibilityRule,
    },
    {
      id: 'solid-open-closed',
      priority: 'HIGH',
      content: solidOpenClosedRule,
    },
    {
      id: 'dry-principle',
      priority: 'HIGH',
      content: dryPrincipleRule,
    },
    {
      id: 'kiss-yagni',
      priority: 'MEDIUM',
      content: kissYagniRule,
    },
    {
      id: 'solid-dependency-inversion',
      priority: 'HIGH',
      content: solidDependencyInversionRule,
    },
  ],
})

// ──────────────────────────────────────────────
// Skill: testing-strategy
// ──────────────────────────────────────────────
registry.registerSkill({
  id: 'testing-strategy',
  name: 'Testing Strategy',
  groupId: 'engineering-practices',
  description: 'Writing effective tests — unit, integration, E2E, and applying TDD.',
  howToUse: `
- "Review my test for quality and coverage"
- "How should I test this component?"
- "Is this a good unit test?"
`,
  routingLogic: `
- Writing or reviewing tests → testing-strategy
- TDD workflow questions → testing-strategy
- Mocking/stubbing questions → testing-strategy
`,
  rules: [
    {
      id: 'test-pyramid',
      priority: 'HIGH',
      content: `---
id: test-pyramid
priority: HIGH
tags: [testing, test-pyramid, strategy]
---

# Rule: Follow the Test Pyramid

## The Pyramid
\`\`\`
        /\\
       /  \\   E2E Tests (few, slow, expensive)
      /----\\
     / Integ \\  Integration Tests (some, medium speed)
    /----------\\
   /  Unit Tests \\ (many, fast, cheap)
  /--------------\\
\`\`\`

## Guidelines
- **Unit Tests**: ~70% of tests. Fast, isolated, test a single function/class.
- **Integration Tests**: ~20%. Test how components work together (DB, API).
- **E2E Tests**: ~10%. Test the full user flow in a real environment.

## Anti-Patterns
- **Ice Cream Cone** (inverted pyramid): more E2E than unit tests → slow, fragile CI
- **Testing nothing**: only happy-path unit tests with no edge cases
- **Over-mocking**: mocking everything so tests don't actually verify behavior

## Rule
If your unit tests all pass but the app is broken, you need more integration tests.
`,
    },
    {
      id: 'aaa-pattern',
      priority: 'HIGH',
      content: `---
id: aaa-pattern
priority: HIGH
tags: [testing, arrange-act-assert, readability]
---

# Rule: Structure Tests with Arrange-Act-Assert (AAA)

## Context
Every test should have three clear sections. Mixing them makes tests hard to read and debug.

## Template
\`\`\`
func TestCalculateDiscount(t *testing.T) {
    // Arrange — set up the test scenario
    order := Order{Total: 1500, UserType: "premium"}
    calculator := NewDiscountCalculator()

    // Act — execute the code under test
    discount := calculator.Calculate(order)

    // Assert — verify the expected outcome
    assert.Equal(t, 0.15, discount)
}
\`\`\`

## Bad ❌
\`\`\`
func TestSomething(t *testing.T) {
    // All mixed together — hard to follow
    db := setupDB()
    user := &User{Name: "test"}
    db.Save(user)
    result := service.GetUser(user.ID)
    assert.NotNil(t, result)
    assert.Equal(t, "test", result.Name)
    db.Delete(user)
}
\`\`\`

## Rule
One test should test ONE thing. If you need multiple assertions about different behaviors, write multiple tests.
`,
    },
    {
      id: 'test-behavior-not-implementation',
      priority: 'CRITICAL',
      content: `---
id: test-behavior-not-implementation
priority: CRITICAL
tags: [testing, behavior, brittle-tests]
---

# Rule: Test Behavior, Not Implementation Details

## Context
Tests that verify internal implementation details (which methods were called, internal state) become brittle — they break when you refactor, even if behavior is preserved.

## Bad ❌ — Testing Implementation
\`\`\`
func TestGetUser(t *testing.T) {
    mockRepo := &MockRepo{}
    // Testing that a specific internal method was called
    mockRepo.On("FindByID", "123").Return(user, nil)
    service.GetUser("123")
    mockRepo.AssertCalled(t, "FindByID", "123")  // Brittle!
}
\`\`\`

## Good ✅ — Testing Behavior (observable outcome)
\`\`\`
func TestGetUser_ReturnsUser_WhenExists(t *testing.T) {
    // Arrange
    repo := NewInMemoryUserRepo()
    repo.Add(&User{ID: "123", Name: "Alice"})
    service := NewUserService(repo)

    // Act
    user, err := service.GetUser("123")

    // Assert — test what comes OUT, not how it works internally
    assert.NoError(t, err)
    assert.Equal(t, "Alice", user.Name)
}
\`\`\`

## Why
Implementation tests break on refactoring. Behavior tests survive refactoring and actually prove the code works.
`,
    },
    {
      id: 'test-doubles-usage',
      priority: 'HIGH',
      content: `---
id: test-doubles-usage
priority: HIGH
tags: [testing, mocks, stubs, fakes]
---

# Rule: Use the Right Test Double (Mock vs Stub vs Fake)

## Definitions
- **Dummy**: Passed around but never actually used (to satisfy parameters).
- **Stub**: Provides hard-coded answers to calls made during the test.
- **Spy**: A stub that also records how it was called (e.g., arguments).
- **Mock**: Objects pre-programmed with expectations which form a specification of the calls they are expected to receive.
- **Fake**: Objects that actually have working implementations, but usually take some shortcut (e.g., InMemoryDatabase).

## Rule
Prefer **Fakes** over **Mocks**. Fakes behave like the real thing and test actual interactions, while Mocks encode implementation details into the test.

## Example
Instead of mocking \`db.Save()\`, use an \`InMemoryUserRepository\` that stores data in a map.
`,
    },
    {
      id: 'avoid-flaky-tests',
      priority: 'CRITICAL',
      content: `---
id: avoid-flaky-tests
priority: CRITICAL
tags: [testing, flaky, determinism]
---

# Rule: Eliminate Non-Determinism (Flaky Tests)

## Context
A test that passes 99% of the time and fails 1% of the time is worse than a test that always fails, because it destroys trust in the CI pipeline.

## Top Causes of Flakiness
1. **Time**: Depending on \`time.Now()\` or \`setTimeout\`. Fix: Inject a mock clock.
2. **Concurrency**: \`time.Sleep(100ms)\` waiting for a goroutine. Fix: Use channels or WaitGroups to synchronize.
3. **External Dependencies**: Network calls to third-party APIs. Fix: Use a mock server or VCR to record/replay HTTP traffic.
4. **Randomness**: Using \`rand.Int()\` in tests. Fix: Use a fixed seed for the RNG during tests.
5. **Database State**: Leftover data from previous tests. Fix: Truncate tables or use transactions that rollback after each test.
`,
    },
  ],
})

// ──────────────────────────────────────────────
// Skill: concurrency-fundamentals
// ──────────────────────────────────────────────
registry.registerSkill({
  id: 'concurrency-fundamentals',
  name: 'Concurrency Fundamentals',
  groupId: 'engineering-practices',
  description: 'Threads, race conditions, deadlocks, mutex, and async patterns.',
  howToUse: `
- "Review this concurrent code for race conditions"
- "Is there a deadlock risk here?"
- "How should I synchronize access to this resource?"
`,
  routingLogic: `
- Goroutines / threads / async code → concurrency-fundamentals
- Shared state access → race condition review
- Locks and synchronization → concurrency-fundamentals
`,
  rules: [
    {
      id: 'race-condition',
      priority: 'CRITICAL',
      content: raceConditionRule,
    },
    {
      id: 'deadlock-prevention',
      priority: 'CRITICAL',
      content: deadlockPreventionRule,
    },
    {
      id: 'goroutine-leak',
      priority: 'CRITICAL',
      content: goroutineLeakRule,
    },
    {
      id: 'channels-vs-mutex',
      priority: 'HIGH',
      content: channelsVsMutexRule,
    },
    {
      id: 'context-cancellation',
      priority: 'CRITICAL',
      content: contextCancellationRule,
    },
  ],
})
