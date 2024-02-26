# Visit coutner application

### Step 1
Build an image of application 
```
terminal $ | minikube image build -t visit-counter-app -f ./Dockerfile .
```

Depoloy the application

```
terminal $ | kubectl apply -f kubernetes/visit-counter-app-deployment.yaml
```

### Step 2
Depoloy hpa

```
terminal $ | kubectl apply -f kubernetes/visit-counter-app-deployment-hpa.yaml
```

### Step 3
Depoloy datbase cluster

```
terminal $ | kubectl apply -f kubernetes/visit-counter-app-database-cluster.yaml
```

### Step 4
Build an image of database migration 
```
terminal $ | minikube image build -t visit-counter-app-database-migration-job -f ./Dockerfile .
```

Depoloy the migration job

```
terminal $ | kubectl apply -f kubernetes/visit-counter-app-database-migration-job.yaml
```

### Step 5
Check deployment, pods and logs

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

