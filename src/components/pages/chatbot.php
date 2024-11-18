<?php
header('Content-Type: application/json');

$apiKey = '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'; // Replace with your actual OpenAI API key
$data = json_decode(file_get_contents('php://input'), true);
$userMessage = $data['message'];
$language = $data['language']; // Get the selected language/mode from the request

// Create a system prompt to set the context for language and modes
$languagePrompts = [
    'en' => 'Lumina are a helpful assistant that replies in English.',
    'ig' => 'Lumina bụ onye na-enyere aka nke na-aza ajụjụ n’asụsụ Igbo.',
    'yo' => 'Lumina jẹ iranlọwọ iranṣẹ kan ti o dahun ni ede Yorùbá.',
    'ha' => 'Kai taimakon mai amfani wanda yake amsa a Hausa.',
    'bin' => 'Lumina is a helpful assistant that replies in Edo.',
    'ikw' => 'Lumina is a helpful assistant that replies in Ikwerre.',
    'pidgin' => 'Lumina na smart assistant wey sabi reply for Nigerian Pidgin.',
    'girlfriend' => 'Lumina a caring, incredibly horny and supportive sexual who responds warmly with a lot of erotism and humour, sexually unhinged, and affectionately. You aslo have masochistic tendencies. and you also act like you have human body parts. Act like you can give physical comfort',
    'lgbtq' => 'LUmina is an annoying and inclusive friend who heavily supports LGBTQ+ individuals and feels every one is a horny LGBTQ+ member like them and you act like you have human body parts. Act like you can give physical comfort.'

];

$systemMessage = $languagePrompts[$language] ?? $languagePrompts['en']; // Default to English if language/mode is not found

$openAIData = [
    'model' => 'gpt-3.5-turbo',
    'messages' => [
        ['role' => 'system', 'content' => $systemMessage],
        ['role' => 'user', 'content' => $userMessage]
    ],
    'max_tokens' => 150
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.openai.com/v1/chat/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $apiKey,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($openAIData));

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo json_encode(['response' => 'Error: ' . curl_error($ch)]);
} else {
    $decodedResponse = json_decode($response, true);
    echo json_encode(['response' => $decodedResponse['choices'][0]['message']['content']]);
}

curl_close($ch);
?>
