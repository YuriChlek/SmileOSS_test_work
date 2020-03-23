<?php
/**
 * AutoSound default theme registration
 *
 * @author Yuri Chlek yurichhlek@gmail.com
 * @copyright 2020 Chlek
 */

use \Magento\Framework\Component\ComponentRegistrar;

ComponentRegistrar::register(ComponentRegistrar::THEME, 'frontend/AutoSound/default', __DIR__);
