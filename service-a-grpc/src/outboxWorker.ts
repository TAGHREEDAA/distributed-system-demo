import { Kafka } from 'kafkajs';
import { initDB } from './db';

const kafka = new Kafka({
    clientId: 'outbox-worker',
    brokers: ['localhost:9092']
});

const producer = kafka.producer();

async function runWorker() {
    const db = await initDB();
    await producer.connect();

    console.log('🌀 Outbox Worker started...');

    setInterval(async () => {
        const messages = await db.all(
            `SELECT id, payload FROM outbox_messages WHERE sent_at IS NULL LIMIT 10`
        );

        for (const msg of messages) {
            try {
                await producer.send({
                    topic: 'sum-calculated',
                    messages: [{ key: String(msg.id), value: msg.payload }],
                });

                await db.run(`UPDATE outbox_messages SET sent_at = datetime('now') WHERE id = ?`, msg.id);

                console.log(`✅ Message ${msg.id} sent to Kafka`);
            } catch (err) {
                console.error(`❌ Failed to send message ${msg.id}`, err);
            }
        }
    }, 3000);
}

runWorker().catch(console.error);
