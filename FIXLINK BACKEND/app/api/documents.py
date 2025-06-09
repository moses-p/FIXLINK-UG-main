from flask import Blueprint, request, jsonify
from app import db
from app.models.document import Document
from app.utils.auth import token_required
from app.utils.response import success_response, error_response

bp = Blueprint('documents', __name__)

@bp.route('/upload', methods=['POST'])
@token_required
def upload_document(current_user):
    try:
        if 'file' not in request.files:
            return error_response('No file provided', 400)
            
        file = request.files['file']
        if file.filename == '':
            return error_response('No file selected', 400)
            
        # TODO: Implement file upload logic
        # For now, just create a document record
        document = Document(
            name=file.filename,
            file_path='placeholder_path',  # Replace with actual file path
            document_type=request.form.get('document_type', 'unknown'),
            user_id=current_user.id
        )
        
        db.session.add(document)
        db.session.commit()
        
        return success_response('Document uploaded successfully', document.to_dict())
    except Exception as e:
        return error_response(str(e))

@bp.route('/user', methods=['GET'])
@token_required
def get_user_documents(current_user):
    try:
        documents = Document.query.filter_by(user_id=current_user.id).all()
        return success_response('Documents retrieved successfully', [doc.to_dict() for doc in documents])
    except Exception as e:
        return error_response(str(e))

@bp.route('/<int:document_id>', methods=['GET'])
@token_required
def get_document(current_user, document_id):
    try:
        document = Document.query.get_or_404(document_id)
        if document.user_id != current_user.id:
            return error_response('Unauthorized', 403)
        return success_response('Document retrieved successfully', document.to_dict())
    except Exception as e:
        return error_response(str(e))

@bp.route('/<int:document_id>', methods=['DELETE'])
@token_required
def delete_document(current_user, document_id):
    try:
        document = Document.query.get_or_404(document_id)
        if document.user_id != current_user.id:
            return error_response('Unauthorized', 403)
            
        db.session.delete(document)
        db.session.commit()
        
        return success_response('Document deleted successfully')
    except Exception as e:
        return error_response(str(e)) 