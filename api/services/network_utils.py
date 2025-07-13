import socket
import platform
from flask import request


def get_client_ip():
    """Retorna o IP do cliente"""
    if request.headers.get('X-Forwarded-For'):
        ip = request.headers.get('X-Forwarded-For').split(',')[0].strip()
    else:
        ip = request.remote_addr

    try:
        reverse_dns = socket.gethostbyaddr(ip)[0]
    except socket.herror:
        reverse_dns = None

    return {
        'ip': ip,
        'reverse_dns': reverse_dns
    }


def get_browser_info():
    """Retorna informações do navegador a partir do user-agent"""
    user_agent = request.headers.get('User-Agent', '')

    return {
        'user_agent': user_agent
        # Aqui você pode usar uma lib como `user_agents` para parsear melhor
    }


def get_os_info():
    """Retorna informações sobre o sistema operacional do servidor"""
    return {
        'system': platform.system(),
        'node': platform.node(),
        'release': platform.release(),
        'version': platform.version(),
        'machine': platform.machine(),
        'processor': platform.processor()
    }
