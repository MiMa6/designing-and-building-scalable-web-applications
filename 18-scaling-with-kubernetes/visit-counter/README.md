# Visit counter application

### Step 1
Build an image of the application 
```
terminal $ | minikube image build -t visit-counter-app -f ./Dockerfile .
```

Deploy the application

```
terminal $ | kubectl apply -f kubernetes/visit-counter-app-deployment.yaml
```

### Step 2
Deploy hpa

```
terminal $ | kubectl apply -f kubernetes/visit-counter-app-deployment-hpa.yaml
```

### Step 3
Deploy database cluster

```
terminal $ | kubectl apply -f kubernetes/visit-counter-app-database-cluster.yaml
```

### Step 4
Build an image of database migration 
```
terminal $ | minikube image build -t visit-counter-app-database-migration-job -f ./Dockerfile .
```

Deploy the migration job

```
terminal $ | kubectl apply -f kubernetes/visit-counter-app-database-migration-job.yaml
```

### Step 5
Check deployment, pods, and logs

```
 terminal $ | kubectl get deployments
 terminal $ | kubectl get pods
```

### Step 6
Deploy the service to expose the deployment to the world and take a look at the service

```
 terminal $ | kubectl apply -f kubernetes/visit-counter-app-service.yaml
 terminal $ | kubectl get services
```

Acess app

```
 terminal $ | minikube service hello-minikube-app-service --url
```

