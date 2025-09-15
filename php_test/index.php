<?php
// シンプルなHello World
echo "Hello, GitHub!";

// 変数と配列の例
$name = "Taro";
$skills = ["PHP", "JavaScript", "HTML"];

echo "\nMy name is $name.";
echo "\nI can code in: " . implode(", ", $skills);

// 簡単な関数
function greet($person) {
    return "Nice to meet you, $person!";
}

echo "\n" . greet($name);
?>
