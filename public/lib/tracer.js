"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const resources_1 = require("@opentelemetry/resources");
const opentelemetry = __importStar(require("@opentelemetry/sdk-node"));
const semantic_conventions_1 = require("@opentelemetry/semantic-conventions");
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-otlp-grpc');
const init = function (serviceName) {
    // Define traces
    const traceExporter = new OTLPTraceExporter({});
    const sdk = new opentelemetry.NodeSDK({
        traceExporter,
        instrumentations: [getNodeAutoInstrumentations()],
        resource: new resources_1.Resource({
            [semantic_conventions_1.SemanticResourceAttributes.SERVICE_NAME]: serviceName,
        }),
    });
    sdk
        .start()
        .then(() => console.log('Tracing initialized'))
        .catch((error) => console.log('Error initializing tracing', error));
    // You can also use the shutdown method to gracefully shut down the SDK before process shutdown
    // or on some operating system signal.
    const process = require('process');
    process.on('SIGTERM', () => {
        sdk
            .shutdown()
            .then(() => console.log('SDK shut down successfully'), (err) => console.log('Error shutting down SDK', err))
            .finally(() => process.exit(0));
    });
    return { sdk };
};
exports.default = init;
