# Lesson 5: Compute Model

Compute is where cost, security, and usability collide.

## Compute Instance

A Compute Instance is a personal development VM for a data scientist.

Use it for:

- Notebooks
- Python/R development
- Debugging
- Small experiments

Risk:

- It costs money while running.
- It can become a snowflake if users install random packages manually.

Control:

- Start/stop schedule
- RBAC
- Approved image/environment guidance
- No secrets hardcoded in notebooks

## CPU Compute Cluster

A CPU cluster is shared auto-scaling compute for jobs.

Use it for:

- Feature engineering
- Batch processing
- Small/medium training
- Pipeline steps

Recommended:

```text
min_nodes = 0
max_nodes = agreed limit
idle_seconds_before_scaledown = strict
```

## GPU Compute Cluster

A GPU cluster is the expensive machine.

Use it for:

- Model training that needs acceleration
- Intermittent heavy training

Recommended:

```text
min_nodes = 0
low max_nodes
quota controlled
tagged
monitored
approval-based if needed
```

## Client-safe line

GPU compute will be configured for intermittent on-demand usage with autoscaling and minimum nodes set to zero to control cost.
