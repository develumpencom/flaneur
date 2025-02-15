# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_02_15_183446) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "locations", force: :cascade do |t|
    t.integer "acc"
    t.integer "alt"
    t.integer "batt"
    t.integer "bs", limit: 2
    t.integer "cog"
    t.decimal "lat", precision: 10, scale: 6, null: false
    t.decimal "lon", precision: 10, scale: 6, null: false
    t.integer "rad"
    t.string "t"
    t.string "tid", null: false
    t.integer "tst", null: false
    t.integer "vac"
    t.integer "vel"
    t.float "p"
    t.string "poi"
    t.string "image"
    t.string "imagename"
    t.string "conn"
    t.string "tag"
    t.string "topic"
    t.string "inregions", array: true
    t.string "inrids", array: true
    t.string "ssid"
    t.string "bssid"
    t.datetime "owntracks_created_at"
    t.integer "m", limit: 2
    t.string "_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end
end
