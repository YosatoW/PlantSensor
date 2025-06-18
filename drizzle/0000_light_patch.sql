-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "plant_sensor" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "plant_sensor_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"feuchtigkeit" integer NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"simulated" boolean DEFAULT false NOT NULL
);

*/