module.exports = { "web": { "hostname": "127.0.0.1", "port": 3100 }, "cv_api": { "https": false, "hostname": "127.0.0.1", "port": 8001, "route": { "object_detection": { "sub_route": "", "extract_video_metadata": "/extract-video-metadata/<video_id>/", "cancel_object_detection": "/cancel-object-detection/<video_id>/", "start_object_detection": "/start-object-detection/<video_id>/" } } }, "web_api": { "https": false, "hostname": "127.0.0.1", "port": 3000, "private_config_client_ips": ["192.168.1.102"], "route": { "config": { "sub_route": "/config", "public": "/", "private": "/private/" }, "auth": { "sub_route": "/auth", "login": "/login/<username>/<password>/", "logout": "/logout/", "register": "/register/<username>/<password>/", "is_logged_in": "/is-logged-in/" }, "video": { "sub_route": "/video", "get": "/<video_id>/", "get_all": "/", "post": "/", "delete": "/<video_id>/", "put": "/<video_id>/" }, "object_detection": { "sub_route": "/object-detection", "start": "/start/<video_id>/", "cancel": "/cancel/<video_id>/" }, "cv_feedback": { "sub_route": "/cv-feedback", "object_detection_status": "/object-detection-status/<video_id>/<status>/", "object_detection_progress": "/object-detection-progress/<video_id>/<progress>/" } }, "ws_route": { "video": { "upload_progress": "/video-upload-progress/<upload_id>/" }, "object_detection": { "sub_route": "/object-detection", "watch_status": "/watch-status/<video_id>/", "watch_progress": "/watch-progress/<video_id>/" } } }, "codes": { "log_type": { "ERROR": "ERROR", "INFO": "INFO" }, "web_status": { "OK": "OK", "INTERNAL_SERVER_ERROR": "INTERNAL_SERVER_ERROR", "BAD_REQUEST": "BAD_REQUEST", "NOT_FOUND": "NOT_FOUND", "FORBIDDEN": "FORBIDDEN", "BAD_ENDPOINT": "BAD_ENDPOINT" }, "cv_status": { "NOT_STARTED": "NOT_STARTED", "STARTED": "STARTED", "CANCELED": "CANCELED", "FAILED": "FAILED", "COMPLETED": "COMPLETED" } }, "auth": { "cookie_name": "SD_SESSION_ID" } }