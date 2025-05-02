import path from 'path';
import { initDB } from './db';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';


const PROTO_PATH = path.join(__dirname, '../proto/add.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const grpcObject = grpc.loadPackageDefinition(packageDefinition) as any;
const adderPackage = grpcObject.adder;

async function main() {
    const db = await initDB();

    const server = new grpc.Server();

    server.addService(adderPackage.AdderService.service, {
        Add: async (call: any, callback: any) => {
            const { a, b } = call.request;
            const result = a + b;

            // تخزين الرسالة في جدول outbox
            const payload = JSON.stringify({ result });
            await db.run(`INSERT INTO outbox_messages (payload) VALUES (?)`, [payload]);

            console.log(`📦 Stored result ${result} in outbox`);

            // لسه هنرجع الناتج للـ client مؤقتًا كمان
            callback(null, { result });
        },
    });

    const PORT = '0.0.0.0:50051';
    server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), () => {
        console.log(`🚀 gRPC Server running at ${PORT}`);
        server.start();
    });
}

main();
