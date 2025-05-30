import { Kafka } from 'kafkajs';
import { readTotal, writeTotal } from './storage';

const kafka = new Kafka({
  clientId: 'service-b-consumer',
  brokers: ['kafka:9092', 'localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'sum-consumer-group' });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'sum-calculated', fromBeginning: true });

  console.log('📥 Kafka Consumer is listening...');

  await consumer.run({
    eachMessage: async ({ message }) => {
      const value = message.value?.toString();
      if (!value) return;

      try {
        const payload = JSON.parse(value);
        const incoming = payload.result;

        const currentTotal = await readTotal();
        const newTotal = currentTotal + incoming;

        await writeTotal(newTotal);

        console.log(`✅ Received ${incoming}, total is now ${newTotal}`);
      } catch (err) {
        console.error('❌ Failed to process message:', err);
      }
    },
  });
}

run().catch(console.error);
