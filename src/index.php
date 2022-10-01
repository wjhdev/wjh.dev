<!DOCTYPE html>

<?php define('WEBPRESS_STENCIL_NAMESPACE', 'wjhdev'); ?>

<html dir="ltr" lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0">
    <title>
        <?php echo wp_title("&middot;",true,"right"); ?>
    </title>
    <link rel="stylesheet" type="text/css" href="https://cloud.typography.com/7844898/7618412/css/fonts.css" />
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <webpress-theme id="theme"></webpress-theme>

    <script>
    var element = document.getElementById('theme')
    element.global = webpress
    </script>

    <?php wp_footer(); ?>


</body>

</html>