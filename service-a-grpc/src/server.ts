import path from 'path';
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

const grpcObject = grpc.loadPackageDefinition(packageDefinition);


const adderPackage: any = grpcObject.adder;


const server = new grpc.Server();

server.addService(adderPackage.AdderService.service, {
    Add: (call: any, callback: any) => {
        const { a, b } = call.request;
        const result = a + b;
        callback(null, { result });
    },
});

const PORT = '0.0.0.0:50051';

server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`🚀 gRPC Server running at ${PORT}`);
    server.start();
});
