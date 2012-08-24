{
  "targets": [
    {
      "target_name": "binding",
      "sources": [ "src/binding.cc" ],
      "conditions": [
        ["OS=='mac'",
            {
                "defines": [
                    "__MACOSX_CORE__"
                ],
                "xcode_settings": {
                    "GCC_ENABLE_CPP_EXCEPTIONS": "YES"
                },
                "link_settings": {
                    "libraries": [
                        "Phidget21.framework"
                    ],
                }
            }
        ]
      ]
    }
  ]
}