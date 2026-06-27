# 10. MLOps Lifecycle

## Purpose

MLOps is the operating model for machine learning delivery.

It connects data, code, models, environments, deployment, monitoring, and retraining.

## Lifecycle stages

| Stage | Outcome |
|---|---|
| Experiment | Explore data and candidate approaches |
| Train | Run repeatable training jobs |
| Validate | Check metrics and quality gates |
| Register | Store approved model versions |
| Deploy | Publish model to endpoint or batch process |
| Monitor | Track health, usage, and quality |
| Retrain | Improve model based on new data or drift |

## Enterprise quality gates

- Code review
- Test result
- Metric threshold
- Security review
- Data approval
- Model approval
- Production release approval

## Practical starting point

Start with repeatable training and model registration. Add automated deployment only after the team understands the workspace, job YAML, and approval process.
