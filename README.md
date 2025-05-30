# 🛠️ Distributed System Educational Project

> Learn how to build a production-like distributed system using **gRPC**, **REST**, **Kafka**, **Kubernetes**, and **Observability tools** like Prometheus, Grafana, and OpenTelemetry.

---

## 🎯 Project Goal

This project is designed for educational purposes to simulate a microservices architecture with asynchronous communication, observability, and performance testing.

It aims to teach:
- Inter-service communication
- Reliable message delivery using the Outbox Pattern
- Monitoring and logging using modern observability tools
- Load testing and system behavior under stress

---

## 🧱 Architecture Overview

- **Service A (gRPC)**: Accepts two numbers → adds them → publishes result to Kafka (via Outbox).
- **Service B (REST)**: Consumes messages from Kafka → accumulates result → exposes via REST endpoint.
- **Kafka**: Acts as asynchronous message broker.
- **Outbox Pattern**: Ensures reliable message delivery.
- **Kubernetes**: Hosts services and supporting tools.
- **Observability Stack**: Prometheus, Grafana, OpenTelemetry, (optional: Loki).
- **Load Testing**: Simulated traffic via K6.

---

## ✅ Functional Requirements

### Service A (gRPC)
- [ ] Expose a gRPC endpoint.
- [ ] Accept two integers.
- [ ] Add the numbers.
- [ ] Save result to Outbox table in DB.
- [ ] Background worker sends message from Outbox → Kafka.

### Message Queue (Kafka)
- [ ] Kafka topic receives the sum.
- [ ] Ensure reliable at-least-once delivery.

### Service B (REST)
- [ ] Consume messages from Kafka.
- [ ] Read the last total from file/storage.
- [ ] Add new sum to total and save it.
- [ ] Expose REST endpoint to return total.

---

## 🧪 Non-Functional Requirements

### Deployment
- [ ] Containerize all services (Docker).
- [ ] Deploy services to a local Kubernetes cluster (e.g., Minikube or Kind).

### Observability
- [ ] Use OpenTelemetry for instrumentation.
- [ ] Collect metrics using Prometheus.
- [ ] Visualize metrics via Grafana.
- [ ] (Optional) Use Loki for log aggregation.
- [ ] Track latency between message sent (Service A) and received (Service B).

### Load Testing
- [ ] Use K6 to simulate 1000+ users hitting gRPC and REST endpoints.
- [ ] Observe logs and metrics under load.

---

## 🚦 Continuous Integration / Continuous Deployment (CI/CD)

- [ ] إعداد CI لتشغيل اختبارات الوحدة (Unit Tests) على كل PR.
- [ ] بناء صور Docker تلقائيًا عند كل push أو merge.
- [ ] نشر تلقائي (Deployment) إلى Kubernetes Cluster (اختياري).
- [ ] مراقبة حالة الخدمات بعد النشر.

---

## ⚙️ Tech Stack

| Area | Tool |
|------|------|
| Communication | gRPC, REST |
| Queue | Kafka |
| Observability | OpenTelemetry, Prometheus, Grafana |
| Containerization | Docker |
| Orchestration | Kubernetes |
| Load Testing | K6 |

---

## 📋 Development Checklist

- [ ] Setup local Docker + Kubernetes environment.
- [ ] Scaffold Service A (gRPC).
- [ ] Scaffold Service B (REST + Kafka consumer).
- [ ] Implement Outbox Pattern in Service A.
- [ ] Setup Kafka with Docker or Helm.
- [ ] Add Prometheus & Grafana dashboards.
- [ ] Add OpenTelemetry instrumentation.
- [ ] Create and run K6 test scripts.
- [ ] Measure queue latency and performance under load.
- [ ] Final cleanup and documentation polish.
