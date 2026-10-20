import type { BriefValues, InlineRun, Page, SourceExcerpt, TemplateId } from './model';

// Curated selections checked against the recorded git commit. No runtime source scraping.

export const SEED_BRIEF: BriefValues = {
  "audience": "Working STEM professionals with no prior Python experience",
  "focus": "Notebook run order, variable assignment, and basic Python types",
  "delivery": "Self-paced online study",
  "criteria": "Define new terms; retain source evidence; keep units explicit; provide accessible text"
};

export const SOURCE_EXCERPTS: SourceExcerpt[] = [
  {
    "id": "course-goals",
    "title": "Course goals and audience",
    "path": "docs/course-series-plan.md",
    "section": "Series overview: Audience; Course 1: CLO 1",
    "capturedAt": "2026-10-19",
    "commit": "ac55b3e27f8b243d9422a5f1125b05bc64fbd0a8",
    "digest": "b47a5b30a5646eabdec13d4475415042c928d241a62a16713f6540c8bbf68101",
    "text": "Working STEM professionals in engineering, energy, mining, and manufacturing who currently do data work in spreadsheets and want to automate it. No programming background assumed at series entry. Fully self-paced and asynchronous, no instructor, all assessment self-assessed.\n\nUse code cells in a Colab notebook to predict a variable's value from the order cells run, not the page position, along with restoring a consistent state using Restart session and run all."
  },
  {
    "id": "lesson-material",
    "title": "Existing lesson material",
    "path": "courses/course-1/lesson-1/pages.md",
    "section": "Selected passages from source pages 1, 4, and 6; Page 6 assignment distinction",
    "capturedAt": "2026-10-19",
    "commit": "ac55b3e27f8b243d9422a5f1125b05bc64fbd0a8",
    "digest": "1d46f49286f4913e0007fb69953bfb3df68ff1bbe04c7958563db201ea9f8efa",
    "text": "At the end of a shift, a pump-station technician records the station ID, inspection cycle, discharge pressure, and alarm state for the next crew. Retyping those fields makes it easy to omit a unit, copy an old reading, or leave a coworker unsure which result is current. In this lesson, you will build that record in Colab, explain it with text, and use a clean top-to-bottom run to confirm what the notebook reports.\n\nDuring a shift, a technician may test a newer pressure and then rerun an earlier cell while checking an old value. The cells stay in the same positions, but the value used in the report can change. To review that notebook, you need to separate page order from run order.\n\nThe kernel runs a code cell when you tell it to run. It also remembers the most recent value attached to each variable.\n\nOne pump record mixes an equipment identifier, a completed-cycle count, a measured pressure, and an alarm state. Those values appear together in the shift report, but Python cannot use all four in the same way. Their syntax tells Python what each value is and what operations make sense for it.\n\nA variable is a name attached to a value so you can reuse it. An assignment uses = to attach the name on the left to the value on the right.\n\nPump records contain several kinds of values. Python calls the kind of a value its type.\n\nThe assignment does not print anything, and = does not ask whether two values are equal."
  },
  {
    "id": "builder-requirements",
    "title": "Builder requirements",
    "path": "docs/proed-course-builder-answers.md",
    "section": "Production-only selection: Text page type and accessibility requirements",
    "capturedAt": "2026-10-19",
    "commit": "ac55b3e27f8b243d9422a5f1125b05bc64fbd0a8",
    "digest": "967794b8552810a3871adff8ecbe5006ce53d23f6890ec814a05e72304059db9",
    "text": "Text (concept and worked-example spine; also the host for embedded video, see Section 6).\n\nAll content still must meet WCAG 2.1 AA (keyboard-operable interactions, alt text, text alternatives for visual activities)."
  }
];

export const PAGES: Page[] = [
  {
    "id": "page-intro",
    "title": "Your First Notebook",
    "sourcePage": 1,
    "purpose": "Introduce the pump-station context.",
    "blocks": [
      {
        "id": "intro-scenario",
        "text": "At the end of a shift, a pump-station technician records the station ID, inspection cycle, discharge pressure, and alarm state for the next crew. Retyping those fields makes it easy to omit a unit, copy an old reading, or leave a coworker unsure which result is current. In this lesson, you will build that record in Colab, explain it with text, and use a clean top-to-bottom run to confirm what the notebook reports.",
        "runs": [
          {
            "text": "At the end of a shift, a pump-station technician records the station ID, inspection cycle, discharge pressure, and alarm state for the next crew. Retyping those fields makes it easy to omit a unit, copy an old reading, or leave a coworker unsure which result is current. In this lesson, you will build that record in Colab, explain it with text, and use a clean top-to-bottom run to confirm what the notebook reports.",
            "mark": "plain"
          }
        ],
        "sourceId": "lesson-material",
        "edited": false
      }
    ]
  },
  {
    "id": "page-kernel",
    "title": "The Kernel Follows Run Order",
    "sourcePage": 4,
    "purpose": "Distinguish run order from page order.",
    "blocks": [
      {
        "id": "kernel-scenario",
        "text": "During a shift, a technician may test a newer pressure and then rerun an earlier cell while checking an old value. The cells stay in the same positions, but the value used in the report can change. To review that notebook, you need to separate page order from run order.",
        "runs": [
          {
            "text": "During a shift, a technician may test a newer pressure and then rerun an earlier cell while checking an old value. The cells stay in the same positions, but the value used in the report can change. To review that notebook, you need to separate page order from run order.",
            "mark": "plain"
          }
        ],
        "sourceId": "lesson-material",
        "edited": false
      },
      {
        "id": "kernel-explanation",
        "text": "The kernel runs a code cell when you tell it to run. It also remembers the most recent value attached to each variable.",
        "runs": [
          {
            "text": "The kernel runs a code cell when you tell it to run. It also remembers the most recent value attached to each variable.",
            "mark": "plain"
          }
        ],
        "sourceId": "lesson-material",
        "edited": false
      }
    ]
  },
  {
    "id": "page-variables",
    "title": "Store Pump Values with Variables and Types",
    "sourcePage": 6,
    "purpose": "Introduce variables and types.",
    "blocks": [
      {
        "id": "variables-scenario",
        "text": "One pump record mixes an equipment identifier, a completed-cycle count, a measured pressure, and an alarm state. Those values appear together in the shift report, but Python cannot use all four in the same way. Their syntax tells Python what each value is and what operations make sense for it.",
        "runs": [
          {
            "text": "One pump record mixes an equipment identifier, a completed-cycle count, a measured pressure, and an alarm state. Those values appear together in the shift report, but Python cannot use all four in the same way. Their syntax tells Python what each value is and what operations make sense for it.",
            "mark": "plain"
          }
        ],
        "sourceId": "lesson-material",
        "edited": false
      },
      {
        "id": "variables-definition",
        "text": "A variable is a name attached to a value so you can reuse it. An assignment uses = to attach the name on the left to the value on the right.",
        "runs": [
          {
            "text": "A ",
            "mark": "plain"
          },
          {
            "text": "variable",
            "mark": "strong"
          },
          {
            "text": " is a name attached to a value so you can reuse it. An ",
            "mark": "plain"
          },
          {
            "text": "assignment",
            "mark": "strong"
          },
          {
            "text": " uses ",
            "mark": "plain"
          },
          {
            "text": "=",
            "mark": "code"
          },
          {
            "text": " to attach the name on the left to the value on the right.",
            "mark": "plain"
          }
        ],
        "sourceId": "lesson-material",
        "edited": false
      },
      {
        "id": "types-introduction",
        "text": "Pump records contain several kinds of values. Python calls the kind of a value its type.",
        "runs": [
          {
            "text": "Pump records contain several kinds of values. Python calls the kind of a value its ",
            "mark": "plain"
          },
          {
            "text": "type",
            "mark": "strong"
          },
          {
            "text": ".",
            "mark": "plain"
          }
        ],
        "sourceId": "lesson-material",
        "edited": false
      }
    ]
  }
];

export const OUTSIDE_PAGES: { sourcePage: number; title: string; type: string }[] = [
  {
    "sourcePage": 2,
    "title": "Run Your First Pump-Station Cell",
    "type": "Text page"
  },
  {
    "sourcePage": 3,
    "title": "Find the Colab Controls You Need",
    "type": "Interactive Page"
  },
  {
    "sourcePage": 5,
    "title": "Decide What the Notebook Will Print",
    "type": "Reflection Page"
  },
  {
    "sourcePage": 7,
    "title": "Read the Type from the Value",
    "type": "Flip Cards"
  },
  {
    "sourcePage": 8,
    "title": "Build and Check a Pump-Station Record",
    "type": "Text page with Colab lab link"
  },
  {
    "sourcePage": 9,
    "title": "Show What You Can Now Do",
    "type": "Reflection Page"
  },
  {
    "sourcePage": 10,
    "title": "Check Your Notebook Foundations",
    "type": "Quiz Page"
  }
];

export const COPYRIGHT: string = "You are authorized to download, read, annotate, and print these materials for your personal study as part of this Mines ProEd course. You may not share, sell, or repurpose them without Mines’ written permission. For complete terms and conditions, please visit https://proed.mines.edu/pages/terms/ . Copyright Colorado School of Mines and its licensors. All rights reserved.";

export const EXAMPLE_COMMENT: string = "Please distinguish assignment from an equality comparison.";

export const PROPOSED_RUNS: InlineRun[] = [
  {
    "text": "A ",
    "mark": "plain"
  },
  {
    "text": "variable",
    "mark": "strong"
  },
  {
    "text": " is a name attached to a value so you can reuse it. An ",
    "mark": "plain"
  },
  {
    "text": "assignment",
    "mark": "strong"
  },
  {
    "text": " uses ",
    "mark": "plain"
  },
  {
    "text": "=",
    "mark": "code"
  },
  {
    "text": " to attach the name on the left to the value on the right.",
    "mark": "plain"
  },
  {
    "text": " The assignment does not print anything, and ",
    "mark": "plain"
  },
  {
    "text": "=",
    "mark": "code"
  },
  {
    "text": " does not ask whether two values are equal.",
    "mark": "plain"
  }
];

export const TEMPLATE_OPTIONS: { id: TemplateId; name: string; description: string; version: string }[] = [
  {
    "id": "simple",
    "name": "Simple lesson",
    "description": "One column with clear headings and generous paragraph spacing.",
    "version": "1.0.0"
  },
  {
    "id": "emphasis",
    "name": "Concept emphasis",
    "description": "The same text with a tinted panel around designated concept definitions.",
    "version": "1.0.0"
  }
];

export const PASSAGE_PROVENANCE = [
  {
    "id": "intro-scenario",
    "path": "courses/course-1/lesson-1/pages.md",
    "sourceCommit": "ac55b3e27f8b243d9422a5f1125b05bc64fbd0a8",
    "digest": "fbc0b97dcf6cb2010880328cd44ddcb94e285f8ab7694373661b2c5acd044f54",
    "digestFormat": "SHA-256 of UTF-8 canonical plain text, no trailing newline",
    "text": "At the end of a shift, a pump-station technician records the station ID, inspection cycle, discharge pressure, and alarm state for the next crew. Retyping those fields makes it easy to omit a unit, copy an old reading, or leave a coworker unsure which result is current. In this lesson, you will build that record in Colab, explain it with text, and use a clean top-to-bottom run to confirm what the notebook reports."
  },
  {
    "id": "kernel-scenario",
    "path": "courses/course-1/lesson-1/pages.md",
    "sourceCommit": "ac55b3e27f8b243d9422a5f1125b05bc64fbd0a8",
    "digest": "444468769073448e35958e15ae59252f145a02c4eee3d34e866739be978d8e06",
    "digestFormat": "SHA-256 of UTF-8 canonical plain text, no trailing newline",
    "text": "During a shift, a technician may test a newer pressure and then rerun an earlier cell while checking an old value. The cells stay in the same positions, but the value used in the report can change. To review that notebook, you need to separate page order from run order."
  },
  {
    "id": "kernel-explanation",
    "path": "courses/course-1/lesson-1/pages.md",
    "sourceCommit": "ac55b3e27f8b243d9422a5f1125b05bc64fbd0a8",
    "digest": "b0d90def1b1b0d45787321a4a87f2ce61fb3d759771cc3481c2e5db1ea6e45d8",
    "digestFormat": "SHA-256 of UTF-8 canonical plain text, no trailing newline",
    "text": "The kernel runs a code cell when you tell it to run. It also remembers the most recent value attached to each variable."
  },
  {
    "id": "variables-scenario",
    "path": "courses/course-1/lesson-1/pages.md",
    "sourceCommit": "ac55b3e27f8b243d9422a5f1125b05bc64fbd0a8",
    "digest": "3a573a33ee1d6a0b9d136bce7987644827d91c5ef2d5ddf85212f65a5aa86d9a",
    "digestFormat": "SHA-256 of UTF-8 canonical plain text, no trailing newline",
    "text": "One pump record mixes an equipment identifier, a completed-cycle count, a measured pressure, and an alarm state. Those values appear together in the shift report, but Python cannot use all four in the same way. Their syntax tells Python what each value is and what operations make sense for it."
  },
  {
    "id": "variables-definition",
    "path": "courses/course-1/lesson-1/pages.md",
    "sourceCommit": "ac55b3e27f8b243d9422a5f1125b05bc64fbd0a8",
    "digest": "4e15b97f2cb9f795b2ab5c722d767055224aa354738582b277a510efaf2ceaea",
    "digestFormat": "SHA-256 of UTF-8 canonical plain text, no trailing newline",
    "text": "A variable is a name attached to a value so you can reuse it. An assignment uses = to attach the name on the left to the value on the right."
  },
  {
    "id": "types-introduction",
    "path": "courses/course-1/lesson-1/pages.md",
    "sourceCommit": "ac55b3e27f8b243d9422a5f1125b05bc64fbd0a8",
    "digest": "3f37b54dae74e4d4f5b8b34d9ba4310965229a9881b57ce163129cabf3a2a1bb",
    "digestFormat": "SHA-256 of UTF-8 canonical plain text, no trailing newline",
    "text": "Pump records contain several kinds of values. Python calls the kind of a value its type."
  },
  {
    "id": "proposal-addition",
    "path": "courses/course-1/lesson-1/pages.md",
    "sourceCommit": "ac55b3e27f8b243d9422a5f1125b05bc64fbd0a8",
    "digest": "a76ddae028d00af79f7e54157869f15b7fa9c6c4c21e44294072f2d912d91d0f",
    "digestFormat": "SHA-256 of UTF-8 canonical plain text, no trailing newline",
    "text": "The assignment does not print anything, and = does not ask whether two values are equal."
  },
  {
    "id": "course-audience",
    "path": "docs/course-series-plan.md",
    "sourceCommit": "ac55b3e27f8b243d9422a5f1125b05bc64fbd0a8",
    "digest": "61b76f6ec3f639227a9ccee1e684b154f72d5b468857360de727a42a99df5777",
    "digestFormat": "SHA-256 of UTF-8 canonical plain text, no trailing newline",
    "text": "Working STEM professionals in engineering, energy, mining, and manufacturing who currently do data work in spreadsheets and want to automate it. No programming background assumed at series entry. Fully self-paced and asynchronous, no instructor, all assessment self-assessed."
  },
  {
    "id": "course-goal",
    "path": "docs/course-series-plan.md",
    "sourceCommit": "ac55b3e27f8b243d9422a5f1125b05bc64fbd0a8",
    "digest": "8de636352f3284883aba52557236bccff0e4edbade6c4eeb96fefd998811f8f5",
    "digestFormat": "SHA-256 of UTF-8 canonical plain text, no trailing newline",
    "text": "Use code cells in a Colab notebook to predict a variable's value from the order cells run, not the page position, along with restoring a consistent state using Restart session and run all."
  },
  {
    "id": "builder-text",
    "path": "docs/proed-course-builder-answers.md",
    "sourceCommit": "ac55b3e27f8b243d9422a5f1125b05bc64fbd0a8",
    "digest": "79b11f7d7e3d39aa84c9cea06259193c71fe938fbce49747a98eb6419ec9995e",
    "digestFormat": "SHA-256 of UTF-8 canonical plain text, no trailing newline",
    "text": "Text (concept and worked-example spine; also the host for embedded video, see Section 6)."
  },
  {
    "id": "builder-accessibility",
    "path": "docs/proed-course-builder-answers.md",
    "sourceCommit": "ac55b3e27f8b243d9422a5f1125b05bc64fbd0a8",
    "digest": "f96fb7b025cb7e387b2ed0a40e1aa5a8d01a994363d9bbb0f64b210d923b8f3f",
    "digestFormat": "SHA-256 of UTF-8 canonical plain text, no trailing newline",
    "text": "All content still must meet WCAG 2.1 AA (keyboard-operable interactions, alt text, text alternatives for visual activities)."
  }
];
