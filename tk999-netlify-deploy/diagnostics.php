<?php
// diagnostics.php
echo "<h1>Server Diagnostics</h1>";
echo "<p>PHP Version: " . phpversion() . "</p>";
echo "<p>Server Software: " . $_SERVER['SERVER_SOFTWARE'] . "</p>";
echo "<p>Document Root: " . $_SERVER['DOCUMENT_ROOT'] . "</p>";
echo "<p>Request URI: " . $_SERVER['REQUEST_URI'] . "</p>";

echo "<h2>Files in current directory:</h2>";
$files = scandir('.');
echo "<ul>";
foreach($files as $file) {
    echo "<li>$file</li>";
}
echo "</ul>";

echo "<h2>File permissions:</h2>";
foreach($files as $file) {
    if(is_file($file)) {
        echo "<p>$file: " . substr(sprintf('%o', fileperms($file)), -4) . "</p>";
    }
}
?>