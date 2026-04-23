import { describe, it, expect } from 'vitest'
import { registry } from './registry.js'
import './loader.js' // This will load all default skills

describe('Skill Registry', () => {
  it('should initialize and register default groups', () => {
    const groups = registry.getGroups()
    expect(groups.length).toBeGreaterThan(0)
  })

  it('should be able to get a specific group', () => {
    const csGroup = registry.getGroup('cs-fundamentals')
    expect(csGroup).toBeDefined()
    expect(csGroup?.id).toBe('cs-fundamentals')
  })

  it('should have skills registered within groups', () => {
    const csGroup = registry.getGroup('cs-fundamentals')
    expect(csGroup?.skills.length).toBeGreaterThan(0)
    
    // Check if we can list all skills globally
    const allSkills = registry.getAllSkills()
    expect(allSkills.length).toBeGreaterThan(0)
  })
})
