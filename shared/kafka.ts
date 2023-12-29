import { Kafka } from "kafkajs";

const host = Bun.env.KAFKA_HOST || "kafka";

export async function makeProducer(clientId: string) {
    const producer = new Kafka({ clientId, brokers: [`${host}:9092`] }).producer();
    await producer.connect();
    return producer;
}

export async function makeConsumer(clientId: string, groupId: string) {
    const consumer = new Kafka({ clientId, brokers: [`${host}:9092`] }).consumer({ groupId });
    await consumer.connect();
    return consumer;
}
