cd ./data/ne_geojson
for file in *.json
do
  cat $file | npx dirty-reproject --forward robinson > ../ne_robinson/$file
done
