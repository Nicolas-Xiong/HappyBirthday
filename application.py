# -*- coding: utf-8 -*-
"""
Created on Sat Jan 11 07:37:07 2020

@author: Nicolas Xiong
"""

from flask import Flask
from flask import render_template
from flask_sqlalchemy import SQLAlchemy  # 导入扩展类
import datetime 
import os
import sys




#兼容处理
WIN = sys.platform.startswith('win') 
if WIN:  # 如果是 Windows 系统，使用三个斜线    
    prefix = 'sqlite:///' 
else:  # 否则使用四个斜线    
    prefix = 'sqlite:////'


app=Flask(__name__)
 
app.secret_key='d'     #按错误提示加的密钥
app.config['DEBUG']=True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = datetime.timedelta(seconds=1)

#从环境变量中读取密钥，如果没有读取到，则使用默认值
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev')
app.config['SQLALCHEMY_DATABASE_URI'] = prefix + os.path.join(os.path.dirname(app.root_path), os.getenv('DATABASE_FILE', 'data.db'))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # 关闭对模型修改的监控
db = SQLAlchemy(app)  # 初始化扩展，传入程序实例 app




@app.route('/', methods=['GET'])
def index():     
    return render_template('index.html')

@app.route('/demo', methods=['GET'])
def demo():     
    return render_template('demo.html')


@app.errorhandler(404)  # 传入要处理的错误代码 
def page_not_found(e):  # 接受异常对象作为参数      
    return render_template('404.html'), 404  # 返回模板和状态码


























