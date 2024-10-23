import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider, Appbar, Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  const addItem = () => {
    if (item.trim() && quantity.trim() && price.trim()) {
      const newItem = {
        id: Math.random().toString(),
        name: item,
        quantity: quantity,
        price: parseFloat(price),
      };
      setShoppingList([...shoppingList, newItem]);
      setItem('');
      setQuantity('');
      setPrice('');
    }
  };

  const removeItem = (id) => {
    setShoppingList(shoppingList.filter((item) => item.id !== id));
  };

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Lista de Compras" />
      </Appbar.Header>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nome do item..."
          value={item}
          onChangeText={setItem}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade..."
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Preço..."
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <Button title="Adicionar" onPress={addItem} />

        <FlatList
          data={shoppingList}
          renderItem={({ item }) => (
            <Card style={styles.listItem}>
              <Card.Content>
                <View style={styles.itemRow}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <Text style={styles.itemText}>Quantidade: {item.quantity}</Text>
                    <Text style={styles.itemText}>Preço: R$ {item.price.toFixed(2)}</Text>
                  </View>
                  <TouchableOpacity onPress={() => removeItem(item.id)}>
                    <Icon name="delete" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              </Card.Content>
            </Card>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  listItem: {
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
  },
});

export default App;
