/**
 * カテゴリ別写真のチェックボックスをsweets_categoryタクソノミーと同期
 * photo_01_categories 〜 photo_20_categories に適用
 *
 * ※ このコードを wp-content/themes/myoko-sweets/functions.php の末尾に追記してください。
 * ※ <?php タグは不要です（functions.php に既にある）。この行から下をそのままコピーしてください。
 */
function myoko_load_sweets_category_choices($field) {
    $terms = get_terms([
        'taxonomy'   => 'sweets_category',
        'hide_empty' => false,
        'orderby'    => 'slug',
    ]);

    if (empty($terms) || is_wp_error($terms)) {
        return $field;
    }

    $field['choices'] = [];
    foreach ($terms as $term) {
        $field['choices'][$term->slug] = $term->name;
    }

    return $field;
}

// photo_01〜photo_20のcategoriesフィールドに動的反映を適用
for ($i = 1; $i <= 20; $i++) {
    $field_name = sprintf('photo_%02d_categories', $i);
    add_filter("acf/load_field/name={$field_name}", 'myoko_load_sweets_category_choices');
}
