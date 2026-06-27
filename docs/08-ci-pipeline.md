# 08. CI Pipeline

## Purpose

The CI pipeline validates changes before they move toward deployment.

For Azure ML, CI should check code, configuration, tests, and deployment files.

## Recommended checks

- Python syntax
- Unit tests
- YAML validation
- Static analysis
- Dependency review
- Infrastructure formatting

## Basic flow

1. Developer commits change
2. Pipeline starts
3. Code is checked out
4. Dependencies are installed
5. Tests run
6. Validation result is published

## Output

The CI pipeline should produce a clear pass or fail result. It may also publish a build artifact for the CD pipeline.

## Common mistakes

- Running training inside CI before basic validation works
- Skipping unit tests
- Not validating YAML
- Using environment-specific values directly in code
- Ignoring repeatability
