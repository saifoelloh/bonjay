# Codebase Architecture Graph

```mermaid
graph TD
    subgraph src_commands["src/commands"]
        src_commands_add_ts["add.ts"]
        src_commands_capture_ts["capture.ts"]
        src_commands_hook_ts["hook.ts"]
        src_commands_init_ts["init.ts"]
        src_commands_list_ts["list.ts"]
        src_commands_remove_ts["remove.ts"]
        src_commands_sync_graph_ts["sync-graph.ts"]
        src_commands____["..."]
        src_commands_update_ts["update.ts"]
        src_commands_init_js["init.js"]
        src_commands_add_js["add.js"]
        src_commands_remove_js["remove.js"]
        src_commands_list_js["list.js"]
        src_commands_update_js["update.js"]
        src_commands_capture_js["capture.js"]
        src_commands_sync_graph_js["sync-graph.js"]
        src_commands_hook_js["hook.js"]
    end
    subgraph src_core["src/core"]
        src_core_config_js["config.js"]
        src_core_generator_js["generator.js"]
        src_core_wizard_js["wizard.js"]
        src_core_config_ts["config.ts"]
        src_core_formatters_ts["formatters.ts"]
        src_core_generator_ts["generator.ts"]
        src_core_formatters_js["formatters.js"]
        src_core_memory_js["memory.js"]
        src_core_memory_ts["memory.ts"]
        src_core_wizard_ts["wizard.ts"]
    end
    subgraph src_skills["src/skills"]
        src_skills_registry_js["registry.js"]
        src_skills_loader_js["loader.js"]
        src_skills_loader_ts["loader.ts"]
        src_skills_registry_test_ts["registry.test.ts"]
        src_skills_registry_ts["registry.ts"]
    end
    subgraph src_targets["src/targets"]
        src_targets_index_js["index.js"]
        src_targets_index_ts["index.ts"]
    end
    subgraph src["src"]
        src_index_ts["index.ts"]
        src_types_d_ts["types.d.ts"]
    end
    subgraph src_skills_ai_persona["src/skills/ai-persona"]
        src_skills_ai_persona_index_ts["index.ts"]
        src_skills_ai_persona_index_js["index.js"]
    end
    subgraph src_skills_ai_persona_communication_style["src/skills/ai-persona/communication-style"]
        src_skills_ai_persona_communication_style_formal_casual_english_md["formal-casual-english.md"]
    end
    subgraph src_skills_cs_fundamentals["src/skills/cs-fundamentals"]
        src_skills_cs_fundamentals_index_ts["index.ts"]
        src_skills_cs_fundamentals_index_js["index.js"]
    end
    subgraph src_skills_cs_fundamentals_computational_complexity["src/skills/cs-fundamentals/computational-complexity"]
        src_skills_cs_fundamentals_computational_complexity_understand_big_o_md["understand-big-o.md"]
        src_skills_cs_fundamentals_computational_complexity_space_time_tradeoff_md["space-time-tradeoff.md"]
        src_skills_cs_fundamentals_computational_complexity_avoid_hidden_complexity_md["avoid-hidden-complexity.md"]
        src_skills_cs_fundamentals_computational_complexity_amortized_analysis_md["amortized-analysis.md"]
        src_skills_cs_fundamentals_computational_complexity_recursion_complexity_md["recursion-complexity.md"]
    end
    subgraph src_skills_cs_fundamentals_algorithms["src/skills/cs-fundamentals/algorithms"]
        src_skills_cs_fundamentals_algorithms_binary_search_pattern_md["binary-search-pattern.md"]
        src_skills_cs_fundamentals_algorithms_dynamic_programming_pattern_md["dynamic-programming-pattern.md"]
        src_skills_cs_fundamentals_algorithms_greedy_when_to_use_md["greedy-when-to-use.md"]
        src_skills_cs_fundamentals_algorithms_two_pointer_technique_md["two-pointer-technique.md"]
        src_skills_cs_fundamentals_algorithms_sliding_window_md["sliding-window.md"]
    end
    subgraph src_skills_data_and_systems["src/skills/data-and-systems"]
        src_skills_data_and_systems_index_ts["index.ts"]
        src_skills_data_and_systems_index_js["index.js"]
    end
    subgraph src_skills_data_and_systems_database_fundamentals["src/skills/data-and-systems/database-fundamentals"]
        src_skills_data_and_systems_database_fundamentals_acid_properties_md["acid-properties.md"]
        src_skills_data_and_systems_database_fundamentals_indexing_strategy_md["indexing-strategy.md"]
        src_skills_data_and_systems_database_fundamentals_n_plus_one_problem_md["n-plus-one-problem.md"]
        src_skills_data_and_systems_database_fundamentals_cap_theorem_md["cap-theorem.md"]
        src_skills_data_and_systems_database_fundamentals_db_connection_pooling_md["db-connection-pooling.md"]
    end
    subgraph src_skills_data_and_systems_memory_management["src/skills/data-and-systems/memory-management"]
        src_skills_data_and_systems_memory_management_stack_vs_heap_md["stack-vs-heap.md"]
        src_skills_data_and_systems_memory_management_memory_leak_patterns_md["memory-leak-patterns.md"]
        src_skills_data_and_systems_memory_management_escape_analysis_md["escape-analysis.md"]
        src_skills_data_and_systems_memory_management_large_object_allocation_md["large-object-allocation.md"]
        src_skills_data_and_systems_memory_management_object_pools_md["object-pools.md"]
    end
    subgraph src_skills_engineering_practices["src/skills/engineering-practices"]
        src_skills_engineering_practices_index_ts["index.ts"]
        src_skills_engineering_practices_index_js["index.js"]
    end
    subgraph src_skills_engineering_practices_code_quality["src/skills/engineering-practices/code-quality"]
        src_skills_engineering_practices_code_quality_solid_single_responsibility_md["solid-single-responsibility.md"]
        src_skills_engineering_practices_code_quality_solid_open_closed_md["solid-open-closed.md"]
        src_skills_engineering_practices_code_quality_dry_principle_md["dry-principle.md"]
        src_skills_engineering_practices_code_quality_kiss_yagni_md["kiss-yagni.md"]
        src_skills_engineering_practices_code_quality_solid_dependency_inversion_md["solid-dependency-inversion.md"]
    end
    subgraph src_skills_engineering_practices_concurrency_fundamentals["src/skills/engineering-practices/concurrency-fundamentals"]
        src_skills_engineering_practices_concurrency_fundamentals_race_condition_md["race-condition.md"]
        src_skills_engineering_practices_concurrency_fundamentals_deadlock_prevention_md["deadlock-prevention.md"]
        src_skills_engineering_practices_concurrency_fundamentals_goroutine_leak_md["goroutine-leak.md"]
        src_skills_engineering_practices_concurrency_fundamentals_channels_vs_mutex_md["channels-vs-mutex.md"]
        src_skills_engineering_practices_concurrency_fundamentals_context_cancellation_md["context-cancellation.md"]
    end
    subgraph src_skills_project_context["src/skills/project-context"]
        src_skills_project_context_index_js["index.js"]
        src_skills_project_context_codebase_analyzer_ts["codebase-analyzer.ts"]
        src_skills_project_context_index_ts["index.ts"]
        src_skills_project_context_codebase_analyzer_js["codebase-analyzer.js"]
    end
    subgraph src_skills_security["src/skills/security"]
        src_skills_security_index_js["index.js"]
        src_skills_security_index_ts["index.ts"]
    end
    subgraph src_skills_software_design["src/skills/software-design"]
        src_skills_software_design_index_js["index.js"]
        src_skills_software_design_index_ts["index.ts"]
    end
    subgraph src_skills_version_control["src/skills/version-control"]
        src_skills_version_control_index_js["index.js"]
        src_skills_version_control_index_ts["index.ts"]
    end
    subgraph src_skills_security_security_fundamentals["src/skills/security/security-fundamentals"]
        src_skills_security_security_fundamentals_injection_prevention_md["injection-prevention.md"]
        src_skills_security_security_fundamentals_authn_vs_authz_md["authn-vs-authz.md"]
        src_skills_security_security_fundamentals_secret_management_md["secret-management.md"]
        src_skills_security_security_fundamentals_password_hashing_md["password-hashing.md"]
        src_skills_security_security_fundamentals_xss_prevention_md["xss-prevention.md"]
    end
    subgraph src_skills_software_design_design_patterns["src/skills/software-design/design-patterns"]
        src_skills_software_design_design_patterns_factory_pattern_md["factory-pattern.md"]
        src_skills_software_design_design_patterns_observer_pattern_md["observer-pattern.md"]
        src_skills_software_design_design_patterns_strategy_pattern_md["strategy-pattern.md"]
        src_skills_software_design_design_patterns_god_object_antipattern_md["god-object-antipattern.md"]
        src_skills_software_design_design_patterns_decorator_pattern_md["decorator-pattern.md"]
    end
    subgraph src_skills_software_design_refactoring["src/skills/software-design/refactoring"]
        src_skills_software_design_refactoring_extract_method_md["extract-method.md"]
        src_skills_software_design_refactoring_replace_magic_numbers_md["replace-magic-numbers.md"]
        src_skills_software_design_refactoring_introduce_parameter_object_md["introduce-parameter-object.md"]
        src_skills_software_design_refactoring_decompose_conditional_md["decompose-conditional.md"]
        src_skills_software_design_refactoring_replace_temp_with_query_md["replace-temp-with-query.md"]
    end
    subgraph src_skills_version_control_git["src/skills/version-control/git"]
        src_skills_version_control_git_conventional_commits_md["conventional-commits.md"]
        src_skills_version_control_git_commit_best_practices_md["commit-best-practices.md"]
        src_skills_version_control_git_github_flow_branching_md["github-flow-branching.md"]
        src_skills_version_control_git_git_release_workflow_md["git-release-workflow.md"]
    end

    src_commands_add_ts --> src_core_config_js
    src_commands_add_ts --> src_core_generator_js
    src_commands_add_ts --> src_skills_registry_js
    src_commands_init_ts --> src_core_wizard_js
    src_commands_init_ts --> src_core_config_js
    src_commands_init_ts --> src_core_generator_js
    src_commands_list_ts --> src_skills_registry_js
    src_commands_list_ts --> src_core_config_js
    src_commands_remove_ts --> src_core_config_js
    src_commands_remove_ts --> src_targets_index_js
    src_commands_sync_graph_ts --> src_commands____
    src_commands_update_ts --> src_core_config_js
    src_commands_update_ts --> src_core_generator_js
    src_core_formatters_ts --> src_skills_registry_js
    src_core_generator_ts --> src_core_config_js
    src_core_generator_ts --> src_skills_registry_js
    src_core_generator_ts --> src_targets_index_js
    src_core_generator_ts --> src_core_formatters_js
    src_core_generator_ts --> src_core_memory_js
    src_core_wizard_ts --> src_skills_registry_js
    src_index_ts --> src_skills_loader_js
    src_index_ts --> src_commands_init_js
    src_index_ts --> src_commands_add_js
    src_index_ts --> src_commands_remove_js
    src_index_ts --> src_commands_list_js
    src_index_ts --> src_commands_update_js
    src_index_ts --> src_commands_capture_js
    src_index_ts --> src_commands_sync_graph_js
    src_index_ts --> src_commands_hook_js
    src_skills_ai_persona_index_ts --> src_skills_registry_js
    src_skills_ai_persona_index_ts --> src_skills_ai_persona_communication_style_formal_casual_english_md
    src_skills_cs_fundamentals_index_ts --> src_skills_registry_js
    src_skills_cs_fundamentals_index_ts --> src_skills_cs_fundamentals_computational_complexity_understand_big_o_md
    src_skills_cs_fundamentals_index_ts --> src_skills_cs_fundamentals_computational_complexity_space_time_tradeoff_md
    src_skills_cs_fundamentals_index_ts --> src_skills_cs_fundamentals_computational_complexity_avoid_hidden_complexity_md
    src_skills_cs_fundamentals_index_ts --> src_skills_cs_fundamentals_computational_complexity_amortized_analysis_md
    src_skills_cs_fundamentals_index_ts --> src_skills_cs_fundamentals_computational_complexity_recursion_complexity_md
    src_skills_cs_fundamentals_index_ts --> src_skills_cs_fundamentals_algorithms_binary_search_pattern_md
    src_skills_cs_fundamentals_index_ts --> src_skills_cs_fundamentals_algorithms_dynamic_programming_pattern_md
    src_skills_cs_fundamentals_index_ts --> src_skills_cs_fundamentals_algorithms_greedy_when_to_use_md
    src_skills_cs_fundamentals_index_ts --> src_skills_cs_fundamentals_algorithms_two_pointer_technique_md
    src_skills_cs_fundamentals_index_ts --> src_skills_cs_fundamentals_algorithms_sliding_window_md
    src_skills_data_and_systems_index_ts --> src_skills_registry_js
    src_skills_data_and_systems_index_ts --> src_skills_data_and_systems_database_fundamentals_acid_properties_md
    src_skills_data_and_systems_index_ts --> src_skills_data_and_systems_database_fundamentals_indexing_strategy_md
    src_skills_data_and_systems_index_ts --> src_skills_data_and_systems_database_fundamentals_n_plus_one_problem_md
    src_skills_data_and_systems_index_ts --> src_skills_data_and_systems_database_fundamentals_cap_theorem_md
    src_skills_data_and_systems_index_ts --> src_skills_data_and_systems_database_fundamentals_db_connection_pooling_md
    src_skills_data_and_systems_index_ts --> src_skills_data_and_systems_memory_management_stack_vs_heap_md
    src_skills_data_and_systems_index_ts --> src_skills_data_and_systems_memory_management_memory_leak_patterns_md
    src_skills_data_and_systems_index_ts --> src_skills_data_and_systems_memory_management_escape_analysis_md
    src_skills_data_and_systems_index_ts --> src_skills_data_and_systems_memory_management_large_object_allocation_md
    src_skills_data_and_systems_index_ts --> src_skills_data_and_systems_memory_management_object_pools_md
    src_skills_engineering_practices_index_ts --> src_skills_registry_js
    src_skills_engineering_practices_index_ts --> src_skills_engineering_practices_code_quality_solid_single_responsibility_md
    src_skills_engineering_practices_index_ts --> src_skills_engineering_practices_code_quality_solid_open_closed_md
    src_skills_engineering_practices_index_ts --> src_skills_engineering_practices_code_quality_dry_principle_md
    src_skills_engineering_practices_index_ts --> src_skills_engineering_practices_code_quality_kiss_yagni_md
    src_skills_engineering_practices_index_ts --> src_skills_engineering_practices_code_quality_solid_dependency_inversion_md
    src_skills_engineering_practices_index_ts --> src_skills_engineering_practices_concurrency_fundamentals_race_condition_md
    src_skills_engineering_practices_index_ts --> src_skills_engineering_practices_concurrency_fundamentals_deadlock_prevention_md
    src_skills_engineering_practices_index_ts --> src_skills_engineering_practices_concurrency_fundamentals_goroutine_leak_md
    src_skills_engineering_practices_index_ts --> src_skills_engineering_practices_concurrency_fundamentals_channels_vs_mutex_md
    src_skills_engineering_practices_index_ts --> src_skills_engineering_practices_concurrency_fundamentals_context_cancellation_md
    src_skills_loader_ts --> src_skills_ai_persona_index_js
    src_skills_loader_ts --> src_skills_cs_fundamentals_index_js
    src_skills_loader_ts --> src_skills_data_and_systems_index_js
    src_skills_loader_ts --> src_skills_engineering_practices_index_js
    src_skills_loader_ts --> src_skills_project_context_index_js
    src_skills_loader_ts --> src_skills_security_index_js
    src_skills_loader_ts --> src_skills_software_design_index_js
    src_skills_loader_ts --> src_skills_version_control_index_js
    src_skills_project_context_codebase_analyzer_ts --> src_skills_registry_js
    src_skills_project_context_index_ts --> src_skills_registry_js
    src_skills_project_context_index_ts --> src_skills_project_context_codebase_analyzer_js
    src_skills_registry_test_ts --> src_skills_registry_js
    src_skills_registry_test_ts --> src_skills_loader_js
    src_skills_security_index_ts --> src_skills_registry_js
    src_skills_security_index_ts --> src_skills_security_security_fundamentals_injection_prevention_md
    src_skills_security_index_ts --> src_skills_security_security_fundamentals_authn_vs_authz_md
    src_skills_security_index_ts --> src_skills_security_security_fundamentals_secret_management_md
    src_skills_security_index_ts --> src_skills_security_security_fundamentals_password_hashing_md
    src_skills_security_index_ts --> src_skills_security_security_fundamentals_xss_prevention_md
    src_skills_software_design_index_ts --> src_skills_registry_js
    src_skills_software_design_index_ts --> src_skills_software_design_design_patterns_factory_pattern_md
    src_skills_software_design_index_ts --> src_skills_software_design_design_patterns_observer_pattern_md
    src_skills_software_design_index_ts --> src_skills_software_design_design_patterns_strategy_pattern_md
    src_skills_software_design_index_ts --> src_skills_software_design_design_patterns_god_object_antipattern_md
    src_skills_software_design_index_ts --> src_skills_software_design_design_patterns_decorator_pattern_md
    src_skills_software_design_index_ts --> src_skills_software_design_refactoring_extract_method_md
    src_skills_software_design_index_ts --> src_skills_software_design_refactoring_replace_magic_numbers_md
    src_skills_software_design_index_ts --> src_skills_software_design_refactoring_introduce_parameter_object_md
    src_skills_software_design_index_ts --> src_skills_software_design_refactoring_decompose_conditional_md
    src_skills_software_design_index_ts --> src_skills_software_design_refactoring_replace_temp_with_query_md
    src_skills_version_control_index_ts --> src_skills_registry_js
    src_skills_version_control_index_ts --> src_skills_version_control_git_conventional_commits_md
    src_skills_version_control_index_ts --> src_skills_version_control_git_commit_best_practices_md
    src_skills_version_control_index_ts --> src_skills_version_control_git_github_flow_branching_md
    src_skills_version_control_index_ts --> src_skills_version_control_git_git_release_workflow_md
    src_targets_index_ts --> src_skills_registry_js
    src_targets_index_ts --> src_core_formatters_js
```

> This graph is automatically generated by Bonjay.