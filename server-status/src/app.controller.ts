import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as os from 'os';
import * as nodeDiskInfo from 'node-disk-info';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('status-origin')
  statusOrigin() {
    return os.cpus();
  }

  @Get('status-sum')
  async statusSum() {
    return {
      cpu: this.getCpuInfo(),
      mem: this.getMemInfo(),
      disk: await this.getDiskStatus(),
      sys: this.getSysInfo(),
    };
  }

  getSysInfo() {
    return {
      computerName: os.hostname(), // 主机名
      computerIp: this.getServerIP(),
      osName: os.platform(), // 操作系统
      osArch: os.arch(), // 系统架构
    };
  }

  // 过滤出非 IPv4 的外部网卡的 ip
  getServerIP() {
    const nets = os.networkInterfaces();
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        if (net.family === 'IPv4' && !net.internal) {
          return net.address;
        }
      }
    }
  }

  bytesToGB(bytes) {
    const gb = bytes / (1024 * 1024 * 1024);
    return gb.toFixed(2);
  }

  // 通过 node-disk-info 获取本地所有的磁盘信息
  async getDiskStatus() {
    const disks = await nodeDiskInfo.getDiskInfoSync();

    const sysFiles = disks.map((disk: any) => {
      return {
        dirName: disk._mounted,
        typeName: disk._filesystem,
        total: this.bytesToGB(disk._blocks) + 'GB',
        used: this.bytesToGB(disk._used) + 'GB',
        free: this.bytesToGB(disk._available) + 'GB',
        usage: ((disk._used / disk._blocks || 0) * 100).toFixed(2),
      };
    });
    return sysFiles;
  }

  // 通过 os 获取内存信息
  getMemInfo() {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const memoryUsagePercentage = (
      ((totalMemory - freeMemory) / totalMemory) *
      100
    ).toFixed(2);
    const mem = {
      total: this.bytesToGB(totalMemory),
      used: this.bytesToGB(usedMemory),
      free: this.bytesToGB(freeMemory),
      usage: memoryUsagePercentage,
    };
    return mem;
  }

  // 通过 os 获取 cpu 信息
  getCpuInfo() {
    const cpus = os.cpus();
    const cpuInfo = cpus.reduce(
      (info, cpu) => {
        info.cpuNum += 1;
        info.user += cpu.times.user;
        info.sys += cpu.times.sys;
        info.idle += cpu.times.idle;
        info.total += cpu.times.user + cpu.times.sys + cpu.times.idle;
        return info;
      },
      { user: 0, sys: 0, idle: 0, total: 0, cpuNum: 0 },
    );
    const cpu = {
      cpuNum: cpuInfo.cpuNum,
      sys: ((cpuInfo.sys / cpuInfo.total) * 100).toFixed(2),
      used: ((cpuInfo.user / cpuInfo.total) * 100).toFixed(2),
      free: ((cpuInfo.idle / cpuInfo.total) * 100).toFixed(2),
    };
    return cpu;
  }
}
