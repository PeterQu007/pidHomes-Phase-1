CREATE DEFINER=`root`@`localhost` PROCEDURE `procedure_term_single_path_by_term_id`(IN term_id bigint(20))
BEGIN
WITH RECURSIVE category_path (term_id, name, slug, parent) AS
(
  SELECT taxo.term_id, tm.name, tm.slug, parent
    FROM wp_term_taxonomy taxo
    INNER JOIN wp_terms tm ON tm.term_id = taxo.term_id
    WHERE tm.term_id = term_id  -- child node
  UNION ALL
  SELECT taxo.term_id, tm.name, tm.slug, taxo.parent
    FROM category_path AS cp JOIN wp_term_taxonomy AS taxo
      ON cp.parent = taxo.term_id
	INNER JOIN wp_terms tm ON tm.term_id = taxo.term_id
)
SELECT level, term_id, name, slug, parent, N.neighborhood_name, N.neighborhood_code
FROM
(SELECT (SELECT Count(*) FROM category_path)-(ROW_NUMBER() OVER ()) level, term_id, name, slug, parent
FROM category_path ) AS c
INNER JOIN pid_neighborhoods N ON N.neighborhood_name = c.name
Order by level;
END