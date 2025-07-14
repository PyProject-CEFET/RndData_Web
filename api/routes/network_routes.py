from flask import Blueprint, jsonify
from api.services.network_utils import *

network_bp = Blueprint('network', __name__)


@network_bp.route('/network/ip', methods=['GET'])
def network_ip():
    return jsonify(get_client_ip())


@network_bp.route('/network/browser', methods=['GET'])
def network_browser():
    return jsonify(get_browser_info())


@network_bp.route('/network/os', methods=['GET'])
def network_os():
    return jsonify(get_os_info())
