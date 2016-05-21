<?php 
get_template_part('templates/head');
?>

<header class="main-header">
  <div class="row">
    <div class="columns medium-3">
      <div class="logo">
        
        <img src="<?php the_field('logo', 'option') ?>">
      </div>
    </div>
    <div class="columns medium-9">
      <div class="navigation">
        <?= render_navigation(); ?>
      </div>
    </div>
  </div>
</header>
