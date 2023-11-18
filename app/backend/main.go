package main

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Staff struct {
	gorm.Model
	Name      string // Corrected the field names
	Date      string // Corrected the field type to string
	ClockedIn bool   // Corrected the field type to bool
}

func main() {
	// Replace the DSN with your PostgreSQL connection details
	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN: "host=localhost port=5432 user=postgres password=postgres dbname=clocking_system sslmode=disable",
	}), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&Staff{})

	// Create
	staff := Staff{Name: "Alex", Date: "2023-09-29", ClockedIn: true}
	db.Create(&staff)

}
