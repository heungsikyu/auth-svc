//import Eureka from 'eureka-js-client';
import * as dotenv from 'dotenv';
const Eureka = require('eureka-js-client').Eureka;
const eurekaHost = (process.env.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE || '192.168.10.157');
const eurekaPort = (process.env.EUREKA_PORT || '8761');
const hostName = (process.env.HOSTNAME || '192.168.10.157')
const ipAddr = '192.168.10.157';

exports.registerWithEureka = function(appName:string , PORT:number) {
     console.log('Eureke server IP : ', eurekaHost);
     console.log('hostName : ', hostName);
     console.log('ipAddr: ', ipAddr);
     const client = new Eureka({
          instance: {
               id: appName,
               instanceId: `${ipAddr} : ${appName} : ${PORT}`,
               app: appName,
               hostName: hostName,
               ipAddr: ipAddr,
               port: {
               '$': PORT,
               '@enabled': 'true',
               },
               vipAddress: appName,
               dataCenterInfo: {
               '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
               name: 'MyOwn',
               },
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
          console.log(error || "jwt service registered")
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
};