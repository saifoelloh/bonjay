// This file explicitly imports all skill group registrations
// to ensure they are executed and registered into the registry.
// Import order matters: each group file calls registry.registerGroup/registerSkill on import.

import './cs-fundamentals/index.js'
import './software-design/index.js'
import './engineering-practices/index.js'
import './data-and-systems/index.js'
import './security/index.js'
import './version-control/index.js'
import './ai-persona/index.js'
