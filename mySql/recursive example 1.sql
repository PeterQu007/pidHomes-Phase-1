SELECT * FROM local.wp_term_taxonomy 
INNER JOIN wp_terms ON wp_terms.term_id = wp_term_taxonomy.term_id
WHERE wp_terms.slug = 'fraser-heights';

-- get a level 
WITH RECURSIVE category_path (term_id, slug, name, lvl) AS
(
  SELECT tm.term_id, tm.slug, tm.name, 0 lvl
    FROM wp_term_taxonomy
    INNER JOIN wp_terms AS tm ON tm.term_id = wp_term_taxonomy.term_id
    WHERE parent =0
  UNION ALL
  SELECT t.term_id, tm.slug, tm.name, cp.lvl + 1
    FROM category_path AS cp JOIN wp_term_taxonomy AS t ON cp.term_id = t.parent
    INNER JOIN wp_terms AS tm ON tm.term_id = t.term_id
      
)
SELECT * FROM category_path
where slug = 'fraser-heights'
ORDER BY lvl;

-- get a single path from bottom to top
SET @slug = 'surrey-1';
WITH RECURSIVE category_path (term_id, name, slug, parent) AS
(
  SELECT taxo.term_id, tm.name, tm.slug, parent
    FROM wp_term_taxonomy taxo
    INNER JOIN wp_terms tm ON tm.term_id = taxo.term_id
    WHERE tm.slug = 'fraser-heights' -- child node
  UNION ALL
  SELECT taxo.term_id, tm.name, tm.slug, taxo.parent
    FROM category_path AS cp JOIN wp_term_taxonomy AS taxo
      ON cp.parent = taxo.term_id
	INNER JOIN wp_terms tm ON tm.term_id = taxo.term_id
)
SELECT level, term_id, name, slug, parent, N.neighborhood_name, N.neighborhood_code
FROM
(SELECT (ROW_NUMBER() OVER ())-1 level, term_id, name, slug, parent
FROM category_path) AS c
INNER JOIN pid_neighborhoods N ON N.neighborhood_name = c.name
Order by level;

SET @term_id = 90;
WITH RECURSIVE category_path (term_id, name, slug, parent) AS
(
  SELECT taxo.term_id, tm.name, tm.slug, parent
    FROM wp_term_taxonomy taxo
    INNER JOIN wp_terms tm ON tm.term_id = taxo.term_id
    WHERE tm.term_id = @term_id  -- child node
  UNION ALL
  SELECT taxo.term_id, tm.name, tm.slug, taxo.parent
    FROM category_path AS cp JOIN wp_term_taxonomy AS taxo
      ON cp.parent = taxo.term_id
	INNER JOIN wp_terms tm ON tm.term_id = taxo.term_id
)
SELECT level, term_id, name, slug, parent, N.neighborhood_name, N.neighborhood_code
FROM
(SELECT (ROW_NUMBER() OVER ())-1 level, term_id, name, slug, parent
FROM category_path Order By level) AS c
INNER JOIN pid_neighborhoods N ON N.neighborhood_name = c.name
Order by level ;

SET @term_id = 88;
WITH RECURSIVE category_path (term_id, name, slug, parent) AS
(
  SELECT taxo.term_id, tm.name, tm.slug, parent
    FROM wp_term_taxonomy taxo
    INNER JOIN wp_terms tm ON tm.term_id = taxo.term_id
    WHERE tm.term_id = @term_id  -- child node
  UNION ALL
  SELECT taxo.term_id, tm.name, tm.slug, taxo.parent
    FROM category_path AS cp JOIN wp_term_taxonomy AS taxo
      ON cp.parent = taxo.term_id
	INNER JOIN wp_terms tm ON tm.term_id = taxo.term_id
)
SELECT (SELECT COUNT(*) FROM category_path) -(ROW_NUMBER() OVER ()) level, term_id, name, slug, parent
FROM category_path Order By level