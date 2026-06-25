
创建智能体接口
curl --location --request POST 'http://10.21.27.155:18090/api/instances' \
--header 'Authorization: Bearer MToxNzgyMjA1NzY4.1DyMW7eTT0x95QgCGlZfNBBWlmsua_YfuVQg5WM8VOo' \
--header 'Cookie: super_sidebar_collapsed=false' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "test3",
    "category_id": 2, 
    "target_user_id": "test"
}'
参数说明
category_id ： 2 openclaw/ hermes 4
name: 智能体名称
target_user_id： 关联的用户 id
响应数据：
  {
    "id": 102,
    "uuid": "ba6672a6-1928-4816-a473-1d90eebcb7c0",
    "user_id": 13,
    "name": "test2",
    "base_image_id": 42,
    "base_image_name": null,
    "slug": "inst-cepzlpx4",
    "status": "creating",
    "docker_container_name": "lobster-13-ba6672a61928",
    "docker_image": "harbor.lightark.cc/infra/openclaw-gateway-vnc:v20260622-8",
    "access_url": "http://10.21.27.155:18090/ba6672a6-1928-4816-a473-1d90eebcb7c0/#token=DBiGIYlsF9LtwBcZmhEttLIcMUNJRF05HMmH8wOD9Uw",
    "access_urls": [
        "http://10.21.27.155:18090/ba6672a6-1928-4816-a473-1d90eebcb7c0/#token=DBiGIYlsF9LtwBcZmhEttLIcMUNJRF05HMmH8wOD9Uw",
        "http://10.21.27.155:18090/ba6672a6-1928-4816-a473-1d90eebcb7c0/p/6080/vnc.html"
    ],
    "auto_stop_seconds": 900,
    "cpu_limit": 4,
    "memory_limit": "4g",
    "auto_update": true,
    "env_vars": {},
    "model_config": {
        "agents": {
            "defaults": {
                "model": {
                    "primary": "new-api/minimax/minimax-m2.7",
                    "fallbacks": [
                        "new-api/minimax/minimax-m2.7"
                    ]
                },
                "models": {
                    "new-api/minimax/minimax-m3": {
                        "alias": "minimax/minimax-m3"
                    },
                    "new-api/minimax/minimax-m2.7": {
                        "alias": "minimax/minimax-m2.7"
                    }
                }
            }
        }
    },
    "last_active_at": null,
    "last_started_at": null,
    "stopped_at": null,
    "created_at": "2026-06-22T13:14:49.183451",
    "updated_at": "2026-06-22T13:14:49.187590",
    "error_message": null,
    "direct_access_url": null,
    "direct_access_urls": [],
    "instance_type": null,
    "category_name": null,
    "agent_id": null,
    "agent_name": null,
    "external_api_url": "http://10.21.27.155:18090/oc/ba6672a6-1928-4816-a473-1d90eebcb7c0/#token=DBiGIYlsF9LtwBcZmhEttLIcMUNJRF05HMmH8wOD9Uw",
    "external_api_urls": [
        "http://10.21.27.155:18090/oc/ba6672a6-1928-4816-a473-1d90eebcb7c0/#token=DBiGIYlsF9LtwBcZmhEttLIcMUNJRF05HMmH8wOD9Uw",
        "http://10.21.27.155:18090/oc/ba6672a6-1928-4816-a473-1d90eebcb7c0/p/6080/vnc.html"
    ],
    "default_api_key": "ocm_o4kAIRpVzMwdCjgfZm_DbVFWss2QjFEbpoWtM6QbQ24",
    "provisioning_status": "running",
    "provisioning_error": null
}

查询智能体创建状态
curl 'http://10.21.27.155:18090/api/instances/ba6672a6-1928-4816-a473-1d90eebcb7c0/events?limit=50' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Accept-Language: zh-CN,zh;q=0.9' \
  -H 'Authorization: Bearer MToxNzgyMjA1NzY4.1DyMW7eTT0x95QgCGlZfNBBWlmsua_YfuVQg5WM8VOo' \
  -H 'Connection: keep-alive' \
  -b 'super_sidebar_collapsed=false' \
  -H 'Referer: http://10.21.27.155:18090/instances/ba6672a6-1928-4816-a473-1d90eebcb7c0' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36' \
  --insecure

响应数据

  [
    {
        "id": 2213,
        "instance_uuid": "ba6672a6-1928-4816-a473-1d90eebcb7c0",
        "action": "provision_completed",
        "result": "success",
        "message": "全部步骤执行完毕，实例已就绪",
        "metadata_json": null,
        "created_at": "2026-06-22T13:14:56.821871"
    },
    {
        "id": 2212,
        "instance_uuid": "ba6672a6-1928-4816-a473-1d90eebcb7c0",
        "action": "step3_skipped",
        "result": "success",
        "message": "无 Agent，跳过解压步骤",
        "metadata_json": null,
        "created_at": "2026-06-22T13:14:56.814578"
    },
    {
        "id": 2211,
        "instance_uuid": "ba6672a6-1928-4816-a473-1d90eebcb7c0",
        "action": "step2_model_applied",
        "result": "success",
        "message": "model config applied (type=openclaw)",
        "metadata_json": null,
        "created_at": "2026-06-22T13:14:56.809184"
    },
    {
        "id": 2210,
        "instance_uuid": "ba6672a6-1928-4816-a473-1d90eebcb7c0",
        "action": "step2_starting_model",
        "result": "success",
        "message": "开始配置模型",
        "metadata_json": null,
        "created_at": "2026-06-22T13:14:49.800611"
    },
    {
        "id": 2209,
        "instance_uuid": "ba6672a6-1928-4816-a473-1d90eebcb7c0",
        "action": "step1_docker_ready",
        "result": "success",
        "message": "Docker 容器创建并启动成功",
        "metadata_json": null,
        "created_at": "2026-06-22T13:14:49.795466"
    },
    {
        "id": 2208,
        "instance_uuid": "ba6672a6-1928-4816-a473-1d90eebcb7c0",
        "action": "step1_image_pulled",
        "result": "success",
        "message": "Status: Image is up to date for harbor.lightark.cc/infra/openclaw-gateway-vnc:v20260622-8",
        "metadata_json": {
            "image": "harbor.lightark.cc/infra/openclaw-gateway-vnc:v20260622-8"
        },
        "created_at": "2026-06-22T13:14:49.595662"
    },
    {
        "id": 2207,
        "instance_uuid": "ba6672a6-1928-4816-a473-1d90eebcb7c0",
        "action": "step1_starting_docker",
        "result": "success",
        "message": "开始拉取镜像并创建容器",
        "metadata_json": null,
        "created_at": "2026-06-22T13:14:49.205041"
    },
    {
        "id": 2206,
        "instance_uuid": "ba6672a6-1928-4816-a473-1d90eebcb7c0",
        "action": "provision_requested",
        "result": "success",
        "message": "Instance record created, provisioning task queued",
        "metadata_json": null,
        "created_at": "2026-06-22T13:14:49.195793"
    }
] 


curl 'http://10.21.27.155:18090/api/openclaw/instances/7a94fe36-f201-4786-b59e-7f50fe39c233/chat/stream' \
  -H 'Accept: */*' \
  -H 'Accept-Language: zh-CN,zh;q=0.9' \
  -H 'Authorization: Bearer MToxNzgyMzAwNTAz.JIsCqPcIAyWgZG7zznLLmFtnE96qIpBD-Wsnq7KaATo' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -b 'super_sidebar_collapsed=false' \
  -H 'Origin: http://10.21.27.155:18090' \
  -H 'Referer: http://10.21.27.155:18090/instances/7a94fe36-f201-4786-b59e-7f50fe39c233' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36' \
  --data-raw '{"agent":"main","message":"你会干什么","sessionKey":"agent:main:web"}' \
  --insecure

响应
  data: {"type":"response.created","response":{"id":"resp_575b1fec-9122-4793-be46-e34ac11c77a4","object":"response","created_at":1782273488,"status":"in_progress","model":"openclaw","output":[],"usage":{"input_tokens":0,"output_tokens":0,"total_tokens":0}}}

data: {"type":"response.in_progress","response":{"id":"resp_575b1fec-9122-4793-be46-e34ac11c77a4","object":"response","created_at":1782273488,"status":"in_progress","model":"openclaw","output":[],"usage":{"input_tokens":0,"output_tokens":0,"total_tokens":0}}}

data: {"type":"response.output_item.added","output_index":0,"item":{"type":"message","id":"msg_314ad760-ba08-44d5-8454-b8a41d4a7280","role":"assistant","content":[{"type":"output_text","text":""}],"status":"in_progress"}}

data: {"type":"response.content_part.added","item_id":"msg_314ad760-ba08-44d5-8454-b8a41d4a7280","output_index":0,"content_index":0,"part":{"type":"output_text","text":""}}

data: {"type":"response.output_text.delta","item_id":"msg_314ad760-ba08-44d5-8454-b8a41d4a7280","output_index":0,"content_index":0,"delta":"你好呀！🌙 晚上好～ 今天怎么样？有什么需要帮忙的吗？"}

data: {"type":"response.output_text.done","item_id":"msg_314ad760-ba08-44d5-8454-b8a41d4a7280","output_index":0,"content_index":0,"text":"你好呀！🌙 晚上好～ 今天怎么样？有什么需要帮忙的吗？"}

data: {"type":"response.content_part.done","item_id":"msg_314ad760-ba08-44d5-8454-b8a41d4a7280","output_index":0,"content_index":0,"part":{"type":"output_text","text":"你好呀！🌙 晚上好～ 今天怎么样？有什么需要帮忙的吗？"}}

data: {"type":"response.output_item.done","output_index":0,"item":{"type":"message","id":"msg_314ad760-ba08-44d5-8454-b8a41d4a7280","role":"assistant","content":[{"type":"output_text","text":"你好呀！🌙 晚上好～ 今天怎么样？有什么需要帮忙的吗？"}],"phase":"final_answer","status":"completed"}}

data: {"type":"response.completed","response":{"id":"resp_575b1fec-9122-4793-be46-e34ac11c77a4","object":"response","created_at":1782273494,"status":"completed","model":"openclaw","output":[{"type":"message","id":"msg_314ad760-ba08-44d5-8454-b8a41d4a7280","role":"assistant","content":[{"type":"output_text","text":"你好呀！🌙 晚上好～ 今天怎么样？有什么需要帮忙的吗？"}],"phase":"final_answer","status":"completed"}],"usage":{"input_tokens":16533,"output_tokens":53,"total_tokens":16586}}}

data: [DONE]

