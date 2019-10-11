<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'direkt2' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '>xF3W>SgaZc7e#+^gA$(8~kTMi!JWKcJCs-c#i.4)Ba}$PS-<Z`l3Dd?eHi+h!#Z' );
define( 'SECURE_AUTH_KEY',  'g+7o}ryBqa2cCWWu-0_,p^VmR[{_cFIx5Mm:Y[96ANy!+nR9!7*PA! ;r`r7UEA8' );
define( 'LOGGED_IN_KEY',    'd-R mAdod[7m1elU;_WE`Gz.OYE3})zW;_.psyA1j +d=2UdG#gD)XS]9w.fu<?f' );
define( 'NONCE_KEY',        'J@gdG}6w.,18QsY.|xf`#WtD>TRB}ZnIJO<m7/|N1B:{D)t)}2AG[k25]~WZ!e-#' );
define( 'AUTH_SALT',        'V{-6K<uf<`nG0 ?LY(-R(JTg_:i)9U@w:mJLcuN&:[1)DTB^^i1<5]`knMH?WJpk' );
define( 'SECURE_AUTH_SALT', 'q-5vj8Zj9kqh5tvtRRO&!@7^![3 ?yaJ[~W1;xX[g60P*3Di59k@l_s,sW&0Up??' );
define( 'LOGGED_IN_SALT',   'dCZ*Dx&klBF>hk0YMiw6.3<-zj7c~7X$0wk&g?PlE n<1u,8%DDVq0f)oOX?/xms' );
define( 'NONCE_SALT',       '!F{#`7aT0jj^yl=:C!}Q<V_cQ0eu2q8y7_StUB9%V:8J};mj`UV`Z?,]?VFVbGeG' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
