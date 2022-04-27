//import Eureka from 'eureka-js-client';
import * as dotenv from 'dotenv';
const Eureka = require('eureka-js-client').Eureka;
const hostName = (process.env.HOSTNAME || 'localhost')
const ipAddr = '127.0.0.1';

exports.registerWithEureka = function(appName:string, PORT:number, eurekaHost: string, eurekaPort: string) {
     console.log('Eureke server IP : ', eurekaHost); 
     console.log('appName : ', appName);
     console.log('ipAddr: ', ipAddr);
     const client = new Eureka({
          instance: {
               id: appName, //SCG loadbalance적용에 반드시 필요 
               instanceId: `${hostName} : ${ipAddr} : ${appName} : ${PORT}`,
               //instanceId: appName, //SCG loadbalance적용에 반드시 필요 
               app: appName, //SCG loadbalance적용에 반드시 필요 
               hostName: hostName,
               ipAddr: ipAddr,
               port: {
               '$': PORT,
               '@enabled': 'true',
               },
               vipAddress: appName,//SCG loadbalance적용에 반드시 필요 

               dataCenterInfo: {
               '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
               name: 'MyOwn',
               },
               registerWithEureka: true, 
               fetchRegistry: true
          },
          //retry 10 time for 3 minute 20 seconds.
          eureka: {
               host: eurekaHost,
               port: eurekaPort,
               servicePath: '/eureka/apps/',
               maxRetries: 10,
               requestRetryDelay: 2000,
          },
     })

     client.logger.level('debug')

     client.start( (error:any) => {
          console.log(error || `Eureka service ${eurekaHost} registered by ${hostName} : ${ipAddr} : ${appName} : ${PORT}`)
     });


     function exitHandler(options:any, exitCode:number) {
          if (options.cleanup) {
          }
          if (exitCode || exitCode === 0) console.log(exitCode);
          if (options.exit) {
               client.stop();
          }
     }

     client.on('deregistered', () => {
          process.exit();
          console.log('after deregistered');
     })

     client.on('started', () => {
          console.log("eureka host : " + eurekaHost);
     })

     process.on('SIGINT', exitHandler.bind(null, {exit:true}));

     process.on('SIGTERM', exitHandler.bind(null, {exit:true}));
};