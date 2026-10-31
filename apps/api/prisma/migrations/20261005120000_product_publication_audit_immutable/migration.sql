CREATE FUNCTION product_publication_events_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION 'product publication events are immutable';
END;
$$;

CREATE TRIGGER product_publication_events_immutable
  BEFORE UPDATE OR DELETE ON "product_publication_events"
  FOR EACH ROW EXECUTE FUNCTION product_publication_events_immutable();
