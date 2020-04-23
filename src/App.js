import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
} from "react-native";

import Repository from "./components/Repository";

import api from "./services/api";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [repositories, setRepositories] = useState([]);

  async function handleLikeRepository(id) {
    api.post(`/repositories/${id}/like`).then(() => {
      const repositoriesUpdated = repositories.map((repository) => {
        if (repository.id === id) {
          repository.likes++;
        }

        return repository;
      });

      setRepositories(repositoriesUpdated);
    });
  }

  useEffect(() => {
    api.get("repositories").then(({ data }) => {
      setRepositories(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        {loading && (
          <Text style={styles.loadingText}>Carregando Repositórios</Text>
        )}
        {!loading && (
          <FlatList
            data={repositories}
            keyExtractor={(repository) => repository.id}
            renderItem={({ item }) => (
              <Repository
                repository={item}
                handleLikeRepository={handleLikeRepository}
              />
            )}
          />
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
