SELECT * FROM local.view_check_term_level where term_id = 88;
SELECT term_id, slug, lvl FROM view_check_term_level WHERE slug='surrey-1';


call procedure_term_single_path_by_slug('surrey-1');

call procedure_term_single_path_by_term_id(88);