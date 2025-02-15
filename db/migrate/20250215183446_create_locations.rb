class CreateLocations < ActiveRecord::Migration[8.0]
  def change
    create_table :locations do |t|
      t.integer :acc
      t.integer :alt
      t.integer :batt
      t.integer :bs, limit: 1
      t.integer :cog
      t.decimal :lat, precision: 10, scale: 6, null: false
      t.decimal :lon, precision: 10, scale: 6, null: false
      t.integer :rad
      t.string :t
      t.string :tid, null: false
      t.integer :tst, null: false
      t.integer :vac
      t.integer :vel
      t.float :p
      t.string :poi
      t.string :image
      t.string :imagename
      t.string :conn
      t.string :tag
      t.string :topic
      t.string :inregions, array: true
      t.string :inrids, array: true
      t.string :ssid
      t.string :bssid
      t.datetime :owntracks_created_at
      t.integer :m, limit: 1
      t.string :_id

      t.timestamps
    end
  end
end
