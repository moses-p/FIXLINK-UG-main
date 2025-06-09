from flask import Blueprint, request, jsonify
from app import db
from app.models.service import Service
from app.utils.auth import token_required
from app.utils.response import success_response, error_response

bp = Blueprint('services', __name__)

@bp.route('/', methods=['POST'])
@token_required
def create_service(current_user):
    try:
        data = request.get_json()
        
        # Verify user is a provider
        if not current_user.provider:
            return error_response('Only providers can create services', 403)
            
        service = Service(
            name=data['name'],
            description=data['description'],
            price=data['price'],
            duration=data['duration'],
            provider_id=current_user.provider.id
        )
        
        db.session.add(service)
        db.session.commit()
        
        return success_response('Service created successfully', service.to_dict())
    except Exception as e:
        return error_response(str(e))

@bp.route('/', methods=['GET'])
def get_services():
    try:
        provider_id = request.args.get('provider_id', type=int)
        query = Service.query
        
        if provider_id:
            query = query.filter_by(provider_id=provider_id)
            
        services = query.filter_by(is_active=True).all()
        return success_response('Services retrieved successfully', [service.to_dict() for service in services])
    except Exception as e:
        return error_response(str(e))

@bp.route('/<int:service_id>', methods=['GET'])
def get_service(service_id):
    try:
        service = Service.query.get_or_404(service_id)
        if not service.is_active:
            return error_response('Service not found', 404)
        return success_response('Service retrieved successfully', service.to_dict())
    except Exception as e:
        return error_response(str(e))

@bp.route('/<int:service_id>', methods=['PUT'])
@token_required
def update_service(current_user, service_id):
    try:
        service = Service.query.get_or_404(service_id)
        
        # Verify user owns the service
        if service.provider_id != current_user.provider.id:
            return error_response('Unauthorized', 403)
            
        data = request.get_json()
        
        service.name = data.get('name', service.name)
        service.description = data.get('description', service.description)
        service.price = data.get('price', service.price)
        service.duration = data.get('duration', service.duration)
        service.is_active = data.get('is_active', service.is_active)
        
        db.session.commit()
        
        return success_response('Service updated successfully', service.to_dict())
    except Exception as e:
        return error_response(str(e))

@bp.route('/<int:service_id>', methods=['DELETE'])
@token_required
def delete_service(current_user, service_id):
    try:
        service = Service.query.get_or_404(service_id)
        
        # Verify user owns the service
        if service.provider_id != current_user.provider.id:
            return error_response('Unauthorized', 403)
            
        service.is_active = False
        db.session.commit()
        
        return success_response('Service deleted successfully')
    except Exception as e:
        return error_response(str(e)) 