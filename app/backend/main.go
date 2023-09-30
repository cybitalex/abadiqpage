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

	// // Read
	// var productRead Product
	// db.First(&productRead, 1)                 // Find the product with ID 1
	// db.First(&productRead, "name = ?", "D42") // Find the product with name "D42"

	// // Update - update product's Name and ClockedIn fields
	// db.Model(&productRead).Updates(Product{Name: "F42", ClockedIn: false}) // Non-zero fields

	// Delete - delete product
	// db.Delete(&productRead, 1)
}
