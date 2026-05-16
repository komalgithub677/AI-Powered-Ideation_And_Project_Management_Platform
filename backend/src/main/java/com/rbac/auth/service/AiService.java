package com.rbac.auth.service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AiService {
    @Value("${openai.api.key}")
    private String apiKey;

    public String generateIdea(String prompt) {

        RestTemplate restTemplate = new RestTemplate();

        String url = "https://api.openai.com/v1/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        String body = """
        {
          "model": "gpt-3.5-turbo",
          "messages": [
            {"role": "user", "content": "%s"}
          ]
        }
        """.formatted(prompt);

        HttpEntity<String> request = new HttpEntity<>(body, headers);

        String response = restTemplate.postForObject(url, request, String.class);

        return response;
    }
}