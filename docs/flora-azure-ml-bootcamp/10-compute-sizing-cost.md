# Lesson 10: Azure ML Compute Sizing and Cost Controls

Compute is where cloud architecture becomes real money.

For the Flora Azure ML Workbench, the compute design must support development, training, batch inference, and occasional GPU use without creating surprise cost.

## The three compute personas

```text
Compute Instance = Personal desk
CPU Cluster      = Shared workshop machines
GPU Cluster      = Expensive super machine
```

## Compute Instance

A compute instance is best for interactive development.

Use it for:

- Notebooks
- Small experiments
- Debugging scripts
- Reviewing training code
- Running Azure ML CLI or SDK commands

Do not use it as the main training engine.

Risk:

```text
A compute instance is like a laptop in the cloud.
If it is left on, it keeps costing money.
```

Control:

- Enable idle shutdown
- Apply start/stop schedules where supported
- Keep VM size modest
- Avoid storing important project state only on the compute instance
- Do not hardcode credentials in notebooks

## CPU Compute Cluster

A CPU compute cluster is the default training and batch processing engine.

Use it for:

- Feature engineering
- Batch inference
- Classical ML training
- Pipeline steps
- Validation jobs

Recommended baseline:

```text
min_instances = 0
max_instances = 2 or 4 for small R&D workbench
idle_time_before_scale_down = 120 to 300 seconds
priority = dedicated for reliable runs
```

Why min zero matters:

```text
min_instances = 0 means no job, no running nodes.
min_instances = 1 means one node runs even when nobody is using it.
```

## GPU Compute Cluster

A GPU cluster is for workloads that actually need acceleration.

Use it for:

- Deep learning
- Large model training
- GPU-enabled frameworks
- Experiments that clearly benefit from CUDA

Do not use GPU by default for every model.

Recommended baseline:

```text
min_instances = 0
max_instances = 1 initially
idle_time_before_scale_down = 120 to 300 seconds
quota approved before delivery
region capacity validated before final design
```

## Cost control rules

| Control | Why it matters |
|---|---|
| Set cluster minimum nodes to zero | Stops paying for idle cluster nodes |
| Keep GPU max nodes low | Prevents accidental expensive scale-out |
| Use modest compute instance sizes | Avoids overbuilding for 2 users |
| Enable idle shutdown | Prevents developer VM cost leakage |
| Tag all compute | Supports cost reporting and ownership |
| Validate quota early | Avoids delivery blocker during testing |
| Prefer CPU for baseline sample model | Keeps validation cheap and reliable |
| Use GPU only for explicit workload need | Avoids using a hammer for every nail |

## Dedicated vs low-priority

Dedicated VMs are more reliable. Low-priority VMs are cheaper but can be evicted.

For Flora:

```text
Use dedicated for acceptance testing and customer demo.
Consider low-priority only for interruptible experiments.
```

Do not use low-priority for a milestone acceptance run unless the customer agrees.

## Region and capacity checkpoint

For this project, region selection matters because GPU capacity can be constrained.

Safe customer wording:

> We recommend validating CPU and GPU quota and capacity in the preferred region before finalizing the compute design. Where the primary region has capacity constraints, we should use the customer-approved alternate region to avoid delivery risk.

## What Terraform should expose as variables

```text
compute_instance_size
compute_instance_idle_shutdown
cpu_cluster_vm_size
cpu_cluster_min_nodes
cpu_cluster_max_nodes
cpu_cluster_idle_seconds
cpu_cluster_subnet_id
gpu_cluster_enabled
gpu_cluster_vm_size
gpu_cluster_min_nodes
gpu_cluster_max_nodes
gpu_cluster_idle_seconds
gpu_cluster_subnet_id
compute_managed_identity_id
enable_node_public_ip
```

## Recommended small R&D baseline

| Workload | Starting point | Why |
|---|---|---|
| Compute Instance | Small/medium CPU VM | Notebook development for 2 users |
| CPU Cluster | 0 to 2 or 4 nodes | Training and batch validation |
| GPU Cluster | 0 to 1 node | Intermittent training only |
| Endpoint | Small CPU deployment | Demo and validation first |
| Batch | CPU cluster | Lower cost and enough for starter workloads |

## What to validate

```text
1. User can open compute instance.
2. Compute instance can access workspace privately.
3. CPU cluster can scale from 0 to 1.
4. Sample training job completes.
5. MLflow captures experiment metrics.
6. Model artifact is written to storage.
7. Model registers successfully.
8. GPU cluster can be created or quota issue is documented.
9. Cluster scales back down after idle period.
10. Cost tags appear on compute resources.
```

## Client-safe explanation

The compute design will use a cost-controlled pattern. Compute instances will support interactive data science development. CPU compute clusters will handle baseline training, pipeline, and batch jobs. GPU compute will be configured only for intermittent on-demand usage with minimum nodes set to zero and constrained maximum scale. Quota and regional capacity should be validated early because GPU availability can block delivery.
