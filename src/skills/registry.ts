export interface Rule {
  id: string
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  content: string
}

export interface SkillDef {
  id: string
  name: string
  groupId: string
  description: string
  longDescription?: string
  howToUse?: string
  routingLogic?: string
  rules: Rule[]
}

export interface GroupDef {
  id: string
  name: string
  icon: string
  description: string
  skills: SkillMeta[]
}

export interface SkillMeta {
  id: string
  description: string
}

class Registry {
  private groups: Map<string, GroupDef> = new Map()
  private skills: Map<string, SkillDef> = new Map()

  registerGroup(group: GroupDef): void {
    this.groups.set(group.id, group)
  }

  registerSkill(skill: SkillDef): void {
    this.skills.set(`${skill.groupId}/${skill.id}`, skill)
  }

  getGroups(): GroupDef[] {
    return Array.from(this.groups.values())
  }

  getGroup(id: string): GroupDef | undefined {
    return this.groups.get(id)
  }

  getSkill(groupId: string, skillId: string): SkillDef | undefined {
    return this.skills.get(`${groupId}/${skillId}`)
  }

  getAllSkills(): SkillDef[] {
    return Array.from(this.skills.values())
  }
}

export const registry = new Registry()
