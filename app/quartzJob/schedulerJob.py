#!/usr/bin/env python
# -*- coding: utf-8 -*-
from apscheduler.schedulers.background import BackgroundScheduler
import commons, ConfigParser, json, os
from app.main import configSingle
from systemJob import recordSystemInfo
import logging

logging.basicConfig()
# http://quanjie.leanote.com/post/Python%E4%BB%BB%E5%8A%A1%E8%B0%83%E5%BA%A6%E6%A8%A1%E5%9D%97-%E2%80%93-APScheduler-2
__author__ = 'chen hui'

class Quartz(object):

    # sched = BackgroundScheduler()

    def __init__(self):
        pass

    def addJobDynamic(self):
        configInstance = configSingle.ConfigObj()
        base_dir = configInstance.config_obj.get("project_conf", "base_dir")
        config_path = os.path.join(base_dir, "config.ini")
        # 初始化任务器 设置默认时区
        sched_config = {
             'timezone': 'Asia/Shanghai'
        }
        sched = BackgroundScheduler(gconfig=sched_config, prefix=None)
        config = configInstance.config_obj
        # 添加系统任务
        system_time = config.get("system_conf", "system_job_time")
        system_job_time = system_time if isinstance(system_time, int) else 10
        sched.add_job(self.runSystemJob, 'interval', seconds=int(system_job_time))
        # 添加传感器时间


        # sections = config.sections()
        # for i in sections:
        #     if str(i).startswith('quartzJob'):
        #         job_name = config.get(i, 'job_name')
        #         job_time = config.get(i, 'job_time')
        #         if job_name is not None and job_time is not None and getattr(Quartz(), job_name) != None:
        #             sched.add_job(getattr(Quartz(), job_name), 'interval', seconds=int(job_time))
        #         pass
        #     pass
        return sched


    @staticmethod
    def runSystemJob():
        recordSystemInfo()
        pass


    def getTestSensorData(self):
        pass

if __name__ == '__main__':
    pass
    # q = Quartz()
    # q.addJobDynamic().start()

