{
  "targets": [
    {
      "target_name": "fibonacci",
      "sources": [ "src/fibonacci.cc" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}