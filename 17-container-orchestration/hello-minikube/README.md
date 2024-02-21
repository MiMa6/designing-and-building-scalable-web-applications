
```
 terminal $ | 
```

hello-minikube-app

### Step 1:
Build an image for Minikube
```
terminal $ | minikube image build -t hello-minikube-app -f ./Dockerfile .
```


Depoloy the application

```
terminal $ | kubectl apply -f kubernetes/hello-minikube-app-deployment.yaml
```

Check deployment, pods and logs

```
 terminal $ | kubectl get deployments
 terminal $ | kubectl get pods
 terminal $ | kubectl logs hello-minikube-app-deployment-867dd65895-6q7zh
```

Deploy the service to expose the deployment to the world and take a look at the service

```
 terminal $ | kubectl apply -f kubernetes/hello-minikube-app-service.yaml
 terminal $ | kubectl get services
```

Acess app

```
 terminal $ | minikube service hello-minikube-app-service --url
```

