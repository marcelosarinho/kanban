<?php

namespace App\Constants;

final class StatusConstant {
  const TODO = 'todo';
  const IN_PROGRESS = 'in_progress';
  const TESTING = 'testing';
  const IMPLEMENTED = 'implemented';

  private static $string = [
    self::TODO => 'A fazer',
    self::IN_PROGRESS => 'Em andamento',
    self::TESTING => 'Em teste',
    self::IMPLEMENTED => 'Implementado',
  ];

  public static function toString($value) {
    return self::$string[$value] ?? 'Desconhecido';
  }

  public static function toArray() {
    return [
      self::TODO,
      self::IN_PROGRESS,
      self::TESTING,
      self::IMPLEMENTED,
    ];
  }

  public static function toArrayAssoc() {
    return [
      self::TODO => self::toString(self::TODO),
      self::IN_PROGRESS => self::toString(self::IN_PROGRESS),
      self::TESTING => self::toString(self::TESTING),
      self::IMPLEMENTED => self::toString(self::IMPLEMENTED),
    ];
  }
}